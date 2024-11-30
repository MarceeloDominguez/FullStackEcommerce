import { useAuth } from "@/store/authStore";
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

export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

// export async function createProduct(product: Omit<Product, "id">) {
//   const token = useAuth.getState().token;

//   const res = await fetch(`${API_URL}/products`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token!,
//     },
//     body: JSON.stringify(product),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create product");
//   }
// }

export async function createProduct(product: FormData) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: token!,
    },
    body: product,
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "Failed to create product");
  }
}

export async function deleteProduct(id: number) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }
}

export async function updateProduct(
  id: number,
  updatedFields: Omit<Product, "id">
) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(updatedFields),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }
}
