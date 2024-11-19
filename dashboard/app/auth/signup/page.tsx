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
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: { email: string; password: string }) => {
    form.reset();
  };

  return (
    <div className="bg-slate-50 flex-1">
      <div className="lg:w-2/4 container mx-auto flex flex-col min-h-screen justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:w-2/4 w-full p-2"
          >
            <h2 className="mb-5 font-semibold text-lg">Register</h2>
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
                    <Input {...field} placeholder="**********" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Register
            </Button>
          </form>
        </Form>
        <footer className="flex gap-2 mt-4">
          <p className="font-medium text-base">
            Do you already have an account?
          </p>
          <Link href={"/auth/login"} className="font-bold">
            Sign In
          </Link>
        </footer>
      </div>
    </div>
  );
}
