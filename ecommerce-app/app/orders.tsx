import { useAuth } from "@/store/authStore";
import { FlatList, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Orders } from "@/type/order_item";
import { useGetOrdersByUserId } from "@/queries/orders";
import SkeletonOrders from "@/components/SkeletonOrders";
import OrdersList from "@/components/OrdersList";

export default function OrdersScreen() {
  const { user } = useAuth();
  const { data: orders, isLoading } = useGetOrdersByUserId(user?.id!);

  return (
    <View className="flex-1 bg-[#f7f2f2]">
      <FlatList<Orders>
        data={isLoading ? Array.from({ length: 10 }) : orders}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>
          isLoading ? <SkeletonOrders /> : <OrdersList order={item} />
        }
        contentContainerClassName="p-5 gap-4"
        ListEmptyComponent={() => (
          <Text className="text-center font-bold text-md">
            There is not orders yet
          </Text>
        )}
      />
    </View>
  );
}
