import { useAuth } from "@/store/authStore";
import { InsertProduct, Product } from "@/type/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

export async function createProduct(product: InsertProduct) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to create product");
  }
}
