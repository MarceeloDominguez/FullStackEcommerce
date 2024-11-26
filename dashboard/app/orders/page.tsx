"use client";
import LayoutPage from "@/components/LayoutPage";
import OrderList from "@/components/OrderList";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/queries/orders";

export default function Orders() {
  const { data: orders, isPending } = useOrders();

  return (
    <LayoutPage>
      <h2 className="text-2xl font-bold mb-6">Order List</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {isPending ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-[152px]" />
            ))}
          </>
        ) : (
          <>
            {orders?.map((item) => (
              <OrderList order={item} key={item.id} />
            ))}
          </>
        )}
      </div>
    </LayoutPage>
  );
}
