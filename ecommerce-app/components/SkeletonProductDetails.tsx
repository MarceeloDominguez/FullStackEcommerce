import { View } from "react-native";
import Skeleton from "./Skeleton";

export default function SkeletonProductDetails() {
  return (
    <View className="rounded-none flex-1 justify-between">
      <View>
        <Skeleton className="mb-6 h-[240px] w-full rounded-md" />
        <Skeleton className="text-sm h-5 font-normal mb-2 text-typography-700 rounded-md w-[80%]" />
        <View className="mb-6">
          <Skeleton className="mb-4 text-md h-6 rounded-md w-[25%]" />
          <Skeleton className="rounded-md h-16" />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Skeleton className="px-4 py-2 w-20 rounded-md h-10" />
        <Skeleton className="px-4 py-2 mr-0 sm:flex-1 h-10 w-32" />
      </View>
    </View>
  );
}
