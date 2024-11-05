import { FlatList } from "react-native";
import React from "react";
import products from "@/assets/product.json";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

export default function CartScreen() {
  return (
    <>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <VStack space="md" className="bg-white rounded-md">
            <Box className="p-5 flex-row gap-4">
              <Image
                source={item.image}
                className="h-14 w-14"
                alt={`image ${item.id}`}
                resizeMode="contain"
              />
              <VStack className="flex-1">
                <Text
                  className="text-sm font-normal mb-2 text-typography-700"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <Heading size="md">${item.price}</Heading>
              </VStack>
              <Text className="text-lg font-normal mb-2 text-typography-700 align-middle">
                1
              </Text>
            </Box>
          </VStack>
        )}
        contentContainerClassName="bg-[#f7f2f2] flex p-5 gap-4"
      />
      <Box className="p-5 bg-[#f7f2f2]">
        <Heading size="md">Total: $100.00</Heading>
        <Button className="px-4 py-2 mt-2">
          <ButtonText size="sm">Checkout</ButtonText>
        </Button>
      </Box>
    </>
  );
}
