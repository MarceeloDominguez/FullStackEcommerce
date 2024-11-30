import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { productsTable } from "../../db/productsSchema.js";
import { eq } from "drizzle-orm";
import _ from "lodash";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";

// Tipo para la respuesta de Cloudinary
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    let imageUrl: string | null = null;

    if (req.file) {
      // Convertir el buffer en un stream utilizando streamifier
      const stream = streamifier.createReadStream(req.file.buffer);

      // Subir la imagen a Cloudinary usando upload_stream
      const result = await new Promise<CloudinaryUploadResponse | undefined>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "uploads", // Carpeta en Cloudinary
              resource_type: "auto", // Detecta automáticamente el tipo (imagen, video, etc.)
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          // Canalizar el buffer convertido en stream a Cloudinary
          stream.pipe(uploadStream); // Esto sube el archivo a Cloudinary
        }
      );

      imageUrl = result?.secure_url || null; // Obtener la URL segura de la imagen
    }

    const productData = {
      ...req.body,
      image: imageUrl,
    };

    const [products] = await db
      .insert(productsTable)
      .values(productData)
      .returning();

    res.status(201).json(products);

    // const [products] = await db
    //   .insert(productsTable)
    //   // .values(req.body)
    //   .values(req.cleanBody)
    //   .returning();

    // res.status(201).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // const updatedFields = req.body;
    const updatedFields = req.cleanBody;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (product) {
      res.json(product);
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(id)))
      .returning();

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
