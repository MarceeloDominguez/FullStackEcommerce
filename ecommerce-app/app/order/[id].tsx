import { getProductById } from "@/api/products";
import { OrderedProducts } from "@/type/product";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useGetOrderById } from "@/queries/orders";
import SkeletonOrderDetails from "@/components/SkeletonOrderDetails";
import Skeleton from "@/components/Skeleton";
import OrderedProductList from "@/components/OrderedProductList";

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: orderList, isLoading } = useGetOrderById(Number(id));

  const orderedProducts =
    orderList?.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })) ?? [];

  const { data: products } = useQuery({
    queryKey: ["products", orderedProducts],
    queryFn: async () => {
      const productData = await Promise.all(
        orderedProducts.map(async ({ productId, quantity }) => {
          const product = await getProductById(productId);
          return { ...product, quantity };
        })
      );
      return productData;
    },
    enabled: orderedProducts.length > 0,
  });

  const priceTotal = products?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: `Order #${id}`,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      <FlatList<OrderedProducts>
        data={isLoading ? Array.from({ length: 3 }) : products}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          isLoading ? (
            <SkeletonOrderDetails />
          ) : (
            <OrderedProductList product={item} />
          )
        }
        contentContainerClassName="bg-[#f7f2f2] flex-1 p-5 gap-4"
        ListFooterComponent={() =>
          isLoading ? (
            <Skeleton className="h-6 w-[25%]" />
          ) : (
            products && (
              <Box>
                <Text size="md">Price total ${priceTotal?.toFixed(2)}</Text>
              </Box>
            )
          )
        }
      />
    </>
  );
}
