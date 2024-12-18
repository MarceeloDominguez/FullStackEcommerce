import React, { useState } from "react";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/store/authStore";
import { useRegister } from "@/queries/auth";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUser, token } = useAuth();

  const isLoggedIn = !!token;

  const { mutate: registerMutation, isError, isPending } = useRegister();

  const handleRegister = () => {
    if (!email || !password) {
      return;
    }

    registerMutation(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("Success register: ", data);
          if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
          }
        },
      }
    );
  };

  const handleShowPassword = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <ScrollView
      className="bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <FormControl className="p-4" isInvalid={isError}>
        <VStack space="xl">
          <Heading className="text-typography-900">Register</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input>
              <InputField type="text" value={email} onChangeText={setEmail} />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                className="pr-3"
                onPress={handleShowPassword}
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
          <Button onPress={handleRegister}>
            {isPending && <ButtonSpinner color="#fff" />}
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
