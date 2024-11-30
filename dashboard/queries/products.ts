import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "@/api/products";
import { Product } from "@/type/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    //mutationFn: (product: Omit<Product, "id">) => createProduct(product),
    mutationFn: (product: FormData) => createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedFields,
    }: {
      id: number;
      updatedFields: Omit<Product, "id">;
    }) => updateProduct(id, updatedFields),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products", data.id] });
    },
  });
};
