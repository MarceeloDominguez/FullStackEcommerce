import { Order } from "@/type/order";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { DateFormatter } from "@/lib/formatDate";
import SelectStatus from "./SelectStatus";

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
        <SelectStatus id={order.id} status={order.status} />
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
