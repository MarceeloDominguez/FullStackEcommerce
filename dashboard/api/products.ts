import { Product } from "@/type/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

export async function getProductById(id: number) {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}
