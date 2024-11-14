import { getOrderById, getOrdersByUserId } from "@/api/orders";
import { useQuery } from "@tanstack/react-query";

export const useGetOrdersByUserId = (userId: number) => {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: () => getOrdersByUserId(userId),
  });
};

export const useGetOrderById = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrderById(id),
  });
};
