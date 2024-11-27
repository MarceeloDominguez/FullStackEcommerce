import { Order } from "@/type/order";
import { Skeleton } from "./skeleton";
import OrderList from "../OrderList";

type OrderGridProps = {
  orders: Order[];
  isPending: boolean;
};

export default function OrderGrid({ orders, isPending }: OrderGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {isPending ? (
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[152px]" />
          ))}
        </>
      ) : (
        <>
          {orders.map((item) => (
            <OrderList order={item} key={item.id} />
          ))}
        </>
      )}
    </div>
  );
}
