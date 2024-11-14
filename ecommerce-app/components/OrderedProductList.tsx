import { VStack } from "./ui/vstack";
import { Box } from "./ui/box";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { OrderedProducts } from "@/type/product";

type OrderedProductListProps = {
  product: OrderedProducts;
};

export default function OrderedProductList({
  product,
}: OrderedProductListProps) {
  return (
    <VStack className="bg-white rounded-md">
      <Box className="p-5 gap-4 flex-row">
        <Image
          source={product.image}
          className="h-14 w-14"
          alt={`image ${product.image}`}
          resizeMode="contain"
        />
        <VStack className="flex-1">
          <Text
            size="sm"
            className="text-sm font-normal mb-1 text-typography-700"
          >
            {product.quantity} item
          </Text>
          <Text
            className="text-sm font-normal mb-2 text-typography-700"
            numberOfLines={2}
          >
            {product.name}
          </Text>
          <Heading size="md">
            ${(product.price * product.quantity).toFixed(2)}
          </Heading>
        </VStack>
      </Box>
    </VStack>
  );
}
