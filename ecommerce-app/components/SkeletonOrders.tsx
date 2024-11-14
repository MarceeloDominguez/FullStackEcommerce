import Skeleton from "./Skeleton";
import { Heading } from "lucide-react-native";
import { Box } from "./ui/box";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export default function SkeletonOrders() {
  return (
    <Skeleton className="bg-white rounded-md flex-row">
      <Box className="p-5 gap-1 flex-1">
        <Heading />
        <Text />
      </Box>
      <View>
        <View className="px-4 items-center justify-center">
          <View className="h-[22px]" />
        </View>
      </View>
    </Skeleton>
  );
}
