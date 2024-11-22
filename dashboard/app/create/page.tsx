"use client";
import LayoutPage from "@/components/LayoutPage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateProduct } from "@/queries/products";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Create() {
  const router = useRouter();
  const {
    mutate: createProduct,
    isPending: creatingProductIsPending,
    isError,
  } = useCreateProduct();

  const form = useForm({
    defaultValues: { name: "", description: "", image: null, price: "" },
  });

  const onSubmit = (data: {
    name: string;
    description: string;
    image: File | null;
    price: string;
  }) => {
    createProduct(
      {
        name: data.name,
        description: data.description,
        image: null,
        price: Number(data.price),
      },
      {
        onSuccess: () => {
          form.reset();
          router.push("/");
        },
        onError: (error) => {
          console.log("Error al crear el producto:", error);
        },
      }
    );
  };

  return (
    <LayoutPage>
      <div className="flex-1">
        <div className="lg:w-3/4 container mx-auto flex flex-col min-h-screen items-center mt-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:w-2/4 w-full p-2"
            >
              <h2 className="mb-5 font-semibold text-lg">Create a product</h2>
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "The product name is required" }}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-6 p-1">
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Shoe Adidas" />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "The product description is required" }}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-6 p-1">
                    <FormLabel>Product description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="A description of the product..."
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                rules={{
                  required: "The product price is required",
                  validate: (value) =>
                    Number(value) > 0 || "The price must be greater then zero",
                }}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-6 p-1">
                    <FormLabel>Product price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="$100.00 USD"
                        type="number"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                //rules={{ required: "You must select an image" }}
                render={({ field, fieldState }) => (
                  <FormItem className="mb-6 p-1">
                    <FormLabel>Select product image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    {/* {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )} */}
                  </FormItem>
                )}
              />
              {isError && (
                <FormMessage className="mb-6 text-center">
                  Access denied
                </FormMessage>
              )}
              <Button className="w-full" type="submit">
                {creatingProductIsPending && (
                  <div className="animate-spin">
                    <LoaderCircle />
                  </div>
                )}
                Add product
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </LayoutPage>
  );
}
