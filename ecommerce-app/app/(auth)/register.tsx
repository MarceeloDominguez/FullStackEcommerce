import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <FormControl className="p-4">
        <VStack space="xl">
          <Heading className="text-typography-900">Register</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input>
              <InputField type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField type={showPassword ? "text" : "password"} />
              <TouchableOpacity
                className="pr-3"
                onPress={handleState}
                activeOpacity={1}
              >
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  className="text-darkBlue-500"
                  color="#a19b9b"
                />
              </TouchableOpacity>
            </Input>
          </VStack>
          <Button>
            <ButtonText className="text-typography-0">Sing up</ButtonText>
          </Button>
          <Text className="text-center">
            Do you already have an account?{" "}
            <Link href={"/(auth)/login"} className="font-bold">
              Sing in
            </Link>
          </Text>
        </VStack>
      </FormControl>
    </ScrollView>
  );
}
