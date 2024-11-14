import { Pressable } from "react-native";
import { VStack } from "./ui/vstack";
import { Box } from "./ui/box";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Link } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Orders } from "@/type/order_item";

type OrdersListProps = {
  order: Orders;
};

export default function OrdersList({ order }: OrdersListProps) {
  return (
    <VStack className="bg-white rounded-md flex-row">
      <Box className="p-5 gap-1 flex-1">
        <Heading>Order #{order.id}</Heading>
        <Text>Status: {`"${order.status}"`}</Text>
      </Box>
      <Link href={`/order/${order.id}` as `${string}:${string}`} asChild>
        <Pressable className="px-4 items-center justify-center">
          <ChevronRight color={"#949090"} size={22} />
        </Pressable>
      </Link>
    </VStack>
  );
}
