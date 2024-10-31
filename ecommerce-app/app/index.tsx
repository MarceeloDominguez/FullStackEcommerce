import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";

export default function HomeScreen() {
  return (
    <View className="bg-violet-600">
      <Text className="text-red-600">Home Screen</Text>

      <Button size="md" variant="solid" action="negative">
        <ButtonText>Hello World!</ButtonText>
      </Button>

      <Box className="bg-green-600 p-5">
        <Text className="text-red-600">This is the Box</Text>
      </Box>
    </View>
  );
}
