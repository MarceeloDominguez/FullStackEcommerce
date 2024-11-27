"use client";
import LayoutPage from "@/components/LayoutPage";
import { useOrders } from "@/queries/orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderGrid from "@/components/ui/OrderGrid";

type OrderStatus = "New" | "Payed" | "Shipped" | "Delivered";

export default function Orders() {
  const { data: orders, isPending } = useOrders();

  const filterOrdersByStatus = (status: OrderStatus) =>
    orders?.filter((order) => order.status === status) ?? [];

  const statuses: OrderStatus[] = ["New", "Payed", "Shipped", "Delivered"];

  return (
    <LayoutPage>
      <h2 className="text-2xl font-bold mb-6">Order List</h2>
      <Tabs defaultValue="New">
        <TabsList className="gap-4 bg-slate-50">
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>
        {statuses.map((status) => (
          <TabsContent key={status} value={status}>
            <OrderGrid
              isPending={isPending}
              orders={filterOrdersByStatus(status)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </LayoutPage>
  );
}
