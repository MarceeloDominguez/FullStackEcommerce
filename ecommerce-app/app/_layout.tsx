import "react-native-reanimated";
import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Link, Stack } from "expo-router";
import { ListOrdered, LogOut, ShoppingCart, User } from "lucide-react-native";
import { Pressable } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCart } from "@/store/cartStore";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/store/authStore";
import { HStack } from "@/components/ui/hstack";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const cartItemsNum = useCart((state) => state.items.length);
  const { token, logout } = useAuth();

  const isLoggedIn = !!token;

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            animation: "fade",
            headerRight: () => (
              <HStack className="items-center gap-3">
                {cartItemsNum > 0 && (
                  <Link href={"/cart"} asChild>
                    <Pressable className="flex-row gap-1 items-center">
                      <ShoppingCart color="#000" size={20} />
                      <Text className="text-md font-normal mb-2 text-typography-700">
                        {cartItemsNum}
                      </Text>
                    </Pressable>
                  </Link>
                )}
                {isLoggedIn && (
                  <Link href={"/orders"} asChild>
                    <Pressable>
                      <ListOrdered color="#000" size={20} />
                    </Pressable>
                  </Link>
                )}
              </HStack>
            ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShadowVisible: false,
              title: "Shop",
              headerTitleAlign: "center",
              headerLeft: () =>
                isLoggedIn ? (
                  <Pressable onPress={() => logout()}>
                    <LogOut color="#000" size={22} />
                  </Pressable>
                ) : (
                  <Link href={"/login"} asChild>
                    <Pressable>
                      <User color="#000" size={22} />
                    </Pressable>
                  </Link>
                ),
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{ headerShadowVisible: false }}
          />
          <Stack.Screen
            name="cart"
            options={{
              headerShadowVisible: false,
              title: "My Cart",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 16 },
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="orders"
            options={{
              headerShadowVisible: false,
              title: "My Orders",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 16 },
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="order/[id]"
            options={{
              headerShadowVisible: false,
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{
              title: "",
              headerShadowVisible: false,
              headerRight: () => null,
            }}
          />
          <Stack.Screen
            name="(auth)/register"
            options={{
              title: "",
              headerShadowVisible: false,
              headerRight: () => null,
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
