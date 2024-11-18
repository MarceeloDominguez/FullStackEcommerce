import { getProductById, listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });
};
