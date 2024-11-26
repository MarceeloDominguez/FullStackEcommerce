import { Product } from "./product";

export interface Order {
  createdAt: string;
  id: number;
  status: string;
  userId: number;
}

export interface Order_item {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderWithItems {
  id: number;
  createdAt: string;
  status: string;
  userId: number;
  items: Order_item[];
}

export interface OrderedProducts extends Product {
  quantity: number;
}
