import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onError: (error) => {
      console.log("Error login: ", error);
    },
  });
};
