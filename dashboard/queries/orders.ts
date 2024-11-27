import { getOrderById, listOrders, updateOrderStatus } from "@/api/orders";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", data.id] });
      queryClient.invalidateQueries({ queryKey: ["orders", data.status] });
    },
  });
};
