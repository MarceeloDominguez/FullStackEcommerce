import React from "react";
import { Product } from "@/type/product";
import { Card } from "./ui/card";
import { Image } from "./ui/image";
import { VStack } from "./ui/vstack";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Link } from "expo-router";
import { Pressable } from "react-native";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/product/${product.id}`} asChild>
      <Pressable className="flex-1">
        <Card className="p-5 rounded-lg max-w-[360px] flex-1">
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
            <Text numberOfLines={2}>{product.description}</Text>
          </VStack>
        </Card>
      </Pressable>
    </Link>
  );
}
