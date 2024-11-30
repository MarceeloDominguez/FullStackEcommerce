import express, {
  json,
  NextFunction,
  urlencoded,
  Request,
  Response,
} from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
import serverless from "serverless-http";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const port = 3000;

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Obtener el directorio actual en un módulo ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Usar memoryStorage en lugar de diskStorage
const storage = multer.memoryStorage(); // Almacena los archivos en la memoria
const upload = multer({ storage: storage });

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

// Servir imágenes estáticas
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Se interceptó la solicitud después de que multer procesó el form-data
// Revisa el campo price y lo convierte de string a number usando parseFloat.
const parseFormData = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.price) {
    req.body.price = parseFloat(req.body.price);
  }
  next();
};

app.use("/products", upload.single("file"), parseFormData, productsRoutes);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
