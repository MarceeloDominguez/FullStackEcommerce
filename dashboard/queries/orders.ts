import { getOrderById, listOrders } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: listOrders,
  });
};

export const useGetOrderById = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
  });
};
