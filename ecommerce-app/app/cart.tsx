import { Alert, FlatList } from "react-native";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { useCart } from "@/store/cartStore";
import { Redirect, router } from "expo-router";
import { CircleMinus, CirclePlus } from "lucide-react-native";
import { HStack } from "@/components/ui/hstack";
import { useAuth } from "@/store/authStore";

export default function CartScreen() {
  const { token } = useAuth();
  const isLoggedIn = !!token;

  const {
    items: cartItems,
    resetCart,
    addProduct,
    removeProduct,
    getTotalPrice,
  } = useCart();

  const onCheckout = async () => {
    if (isLoggedIn) {
      resetCart();
    } else {
      Alert.alert("Login required", "You must be logged in to check out.", [
        {
          text: "Login",
          onPress: () => router.push("/(auth)/login"),
        },
        { text: "Cancel", style: "cancel" },
      ]);
    }
  };

  if (cartItems.length === 0) {
    return <Redirect href={"/"} />;
  }

  return (
    <>
      <FlatList
        data={cartItems}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text className="text-center font-bold text-md">
            There is not product yet
          </Text>
        )}
        renderItem={({ item }) => (
          <VStack space="md" className="bg-white rounded-md">
            <Box className="p-5 flex-row gap-4">
              <Image
                source={item.product.image}
                className="h-14 w-14"
                alt={`image ${item.product.id}`}
                resizeMode="contain"
              />
              <VStack className="flex-1">
                <Text
                  className="text-sm font-normal mb-2 text-typography-700"
                  numberOfLines={2}
                >
                  {item.product.name}
                </Text>
                <Heading size="md">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Heading>
              </VStack>
              <HStack className="items-center">
                <CircleMinus
                  color="#a19b9b"
                  size={20}
                  onPress={() => removeProduct(item.product.id)}
                />
                <Text className="text-md top-1 font-normal mb-2 text-typography-700 align-middle px-2">
                  {item.quantity}
                </Text>
                <CirclePlus
                  color="#a19b9b"
                  size={20}
                  onPress={() => addProduct(item.product)}
                />
              </HStack>
            </Box>
          </VStack>
        )}
        contentContainerClassName="bg-[#f7f2f2] flex p-5 gap-4"
      />
      <Box className="p-5 bg-[#f7f2f2]">
        <Heading size="md">Total: ${getTotalPrice().toFixed(2)}</Heading>
        <Button className="px-4 py-2 mt-2" onPress={onCheckout}>
          <ButtonText size="sm">Checkout</ButtonText>
        </Button>
      </Box>
    </>
  );
}
