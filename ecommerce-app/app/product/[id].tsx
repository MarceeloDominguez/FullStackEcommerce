import { Stack, useLocalSearchParams } from "expo-router";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { View } from "react-native";
import { Plus } from "lucide-react-native";
import SkeletonProductDetails from "@/components/SkeletonProductDetails";
import { useGetProductById } from "@/queries/products";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { data: product, isLoading, error } = useGetProductById(Number(id));

  if (error) {
    return <Text>Product not found!</Text>;
  }

  return (
    <Card className="p-5 rounded-none flex-1 bg-white justify-between">
      <Stack.Screen
        options={{
          title: product?.name,
          headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 16 },
        }}
      />
      {isLoading || !product ? (
        <SkeletonProductDetails />
      ) : (
        <>
          <View>
            <Image
              source={product.image}
              className="mb-6 h-[240px] w-full rounded-md"
              alt={`image ${product.id}`}
              resizeMode="contain"
            />
            <Text className="text-sm font-normal mb-2 text-typography-700">
              {product.name}
            </Text>
            <VStack className="mb-6">
              <Heading size="md" className="mb-4">
                ${product.price}
              </Heading>
              <Text numberOfLines={4}>{product.description}</Text>
            </VStack>
          </View>
          <Box className="flex-row items-center justify-between">
            <Heading size="md">$100.00</Heading>
            <Button className="px-4 py-2 mr-0 sm:flex-1">
              <ButtonText size="sm">Add to cart</ButtonText>
              <Plus color="#fff" size={18} />
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}
