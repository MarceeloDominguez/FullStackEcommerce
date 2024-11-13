import { useAuth } from "@/store/authStore";
import { Order } from "@/type/order_item";

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