import { getProductById } from "@/api/products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, FilePenLine, Trash } from "lucide-react";
import Link from "next/link";

export default async function ProductDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(Number(id));

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="md:w-3/4 container mx-auto p-4">
        <Link href={"/"}>
          <div className="w-12 h-12 flex items-center justify-center">
            <ArrowLeft />
          </div>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex justify-center items-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg w-full md:max-w-md object-contain p-5 bg-white"
            />
          </div>
          <div className="flex justify-center">
            <Card className="shadow-none border-none rounded-none w-full md:max-w-md bg-slate-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {product.name}
                </CardTitle>
                <p className="text-lg text-gray-500">${product.price}</p>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-700">
                  {product.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Button className="w-full sm:w-auto">
                  <FilePenLine />
                  Update Product
                </Button>
                <Button className="w-full sm:w-auto" variant="destructive">
                  <Trash />
                  Delete Product
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
