"use client";
import SkeletonProductDetails from "@/components/SkeletonProductDetails";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteProduct, useGetProductById } from "@/queries/products";
import { useAuth } from "@/store/authStore";
import { FilePenLine, LoaderCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const imageDefault =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/playstation5.jpg";

type ParamsProps = {
  params: { id: string };
};

export default function ProductDetails({ params }: ParamsProps) {
  const router = useRouter();
  const { data: product, isLoading } = useGetProductById(Number(params.id));
  const { user } = useAuth();
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDeleteProduct = () => {
    deleteProduct(product?.id!, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        console.log("Error al eliminar el producto:", error);
      },
    });
  };

  const handleUpdate = () => {
    router.push(`/create?id=${product?.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:ml-48 lg:mt-14 flex-1">
      <div className="md:w-3/4 container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {isLoading ? (
            <SkeletonProductDetails />
          ) : (
            <>
              <div className="flex justify-center items-center mt-2">
                <img
                  src={product?.image || imageDefault}
                  alt={product?.name}
                  className="rounded-lg w-full md:max-w-md object-contain p-5 bg-white"
                />
              </div>
              <div className="flex justify-center mt-2">
                <Card className="shadow-none border-none rounded-none w-full md:max-w-md bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      {product?.name}
                    </CardTitle>
                    <p className="text-lg text-gray-500">${product?.price}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-700">
                      {product?.description}
                    </CardDescription>
                  </CardContent>
                  {user?.role === "seller" && (
                    <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <Button
                        className="w-full sm:w-auto"
                        onClick={handleUpdate}
                      >
                        <FilePenLine />
                        Update Product
                      </Button>
                      <Button
                        className="w-full sm:w-auto"
                        variant="destructive"
                        onClick={handleDeleteProduct}
                      >
                        {isPending && (
                          <div className="animate-spin">
                            <LoaderCircle />
                          </div>
                        )}
                        <Trash />
                        Delete Product
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
