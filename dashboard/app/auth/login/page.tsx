"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/queries/auth";
import { useAuth } from "@/store/authStore";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const { mutate: loginMutation, isPending } = useLogin();
  const { setToken, setUser, token } = useAuth();

  const isLoggedIn = !!token;

  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    loginMutation(data, {
      onSuccess: (res) => {
        if (res.user && res.token) {
          setUser(res.user);
          setToken(res.token);
        }
      },
      onError: (error) => {
        console.log("Error en el login:", error);
      },
    });
    form.reset();
  };

  if (isLoggedIn) {
    return redirect("/");
  }

  return (
    <div className="bg-slate-50 flex-1">
      <div className="lg:w-2/4 container mx-auto flex flex-col min-h-screen justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/4 w-full p-2"
          >
            <h2 className="mb-5 font-semibold text-lg">Login</h2>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6 p-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="seller@gmail.com" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6 p-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="**********"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {isPending && (
                <div className="animate-spin">
                  <LoaderCircle />
                </div>
              )}
              Sign In
            </Button>
          </form>
        </Form>
        <footer className="flex gap-2 mt-4">
          <p className="font-medium text-base">Don't have an account?</p>
          <Link href={"/auth/signup"} className="font-bold">
            Register
          </Link>
        </footer>
      </div>
    </div>
  );
}
