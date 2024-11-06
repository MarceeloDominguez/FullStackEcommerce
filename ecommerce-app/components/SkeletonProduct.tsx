import { View, Text } from "react-native";
import Skeleton from "./Skeleton";

export default function SkeletonProduct() {
  return (
    <Skeleton className="rounded-lg max-w-[360px] flex-1">
      <View className="mb-6 h-[240px] w-full rounded-md" />
      <Text className="text-sm font-normal mb-2 text-typography-700" />
      <View className="mb-6">
        <View className="mb-4" />
      </View>
    </Skeleton>
  );
}
