import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Link, Stack } from "expo-router";
import { ShoppingCart, User } from "lucide-react-native";
import { Pressable } from "react-native";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          animation: "fade",
          headerRight: () => (
            <Link href={"/cart"} asChild>
              <Pressable>
                <ShoppingCart color="#000" size={20} />
              </Pressable>
            </Link>
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            title: "Shop",
            headerTitleAlign: "center",
            headerLeft: () => <User color="#000" size={22} />,
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
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
