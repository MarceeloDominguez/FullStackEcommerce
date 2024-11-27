import { useAuth } from "@/store/authStore";
import { Order, OrderWithItems } from "@/type/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listOrders(): Promise<Order[] | undefined> {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token || "" },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

export async function getOrderById(
  id: number
): Promise<OrderWithItems | undefined> {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token || "" },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}

export async function updateOrderStatus(id: number, status: string) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update order status");
  }
}
