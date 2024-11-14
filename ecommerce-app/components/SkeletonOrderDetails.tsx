import { View } from "react-native";
import Skeleton from "./Skeleton";
import { Box } from "./ui/box";
import { VStack } from "./ui/vstack";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";

export default function SkeletonOrderDetails() {
  return (
    <Skeleton className="bg-white rounded-md">
      <Box className="p-5 gap-4 flex-row">
        <View className="h-14 w-14" />
        <VStack className="flex-1">
          <Text
            size="sm"
            className="text-sm font-normal mb-1 text-typography-700"
          />
          <Text
            className="text-sm font-normal mb-2 text-typography-700"
            numberOfLines={2}
          />
          <Heading size="md" />
        </VStack>
      </Box>
    </Skeleton>
  );
}
