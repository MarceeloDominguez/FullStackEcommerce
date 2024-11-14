import { useAuth } from "@/store/authStore";
import { Order, Orders, OrderWithItems } from "@/type/order_item";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: Order[]) {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token! },
    body: JSON.stringify({ order: {}, items }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(data);
    throw new Error("Error");
  }

  return data;
}

export async function getOrdersByUserId(
  userId: number
): Promise<Orders[] | undefined> {
  const token = useAuth.getState().token;

  const res = await fetch(`${API_URL}/orders/user/${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", Authorization: token! },
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
    headers: { "Content-Type": "application/json", Authorization: token! },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Error in the request");
  }

  return data;
}
