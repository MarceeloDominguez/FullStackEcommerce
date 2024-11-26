import { Order } from "@/type/order";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { DateFormatter } from "@/lib/formatDate";

type OrderListProps = {
  order: Order;
};

export default function OrderList({ order }: OrderListProps) {
  return (
    <Card className="p-2 flex">
      <CardContent className="flex-1 p-2">
        <CardTitle className="text-base">Order #{order.id}</CardTitle>
        <span className="text-sm">Status: {order.status}</span>
        <CardDescription className="mt-1">
          {DateFormatter(order.createdAt)}
        </CardDescription>
        <Button variant="outline" className="mt-3">
          Edit order
        </Button>
      </CardContent>
      <Link
        href={`/orders/order/${order.id}`}
        className="p-2 flex items-center justify-center w-12"
      >
        <ChevronRight />
      </Link>
    </Card>
  );
}
