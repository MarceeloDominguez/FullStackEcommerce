"use client";
import { Product } from "@/type/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import Link from "next/link";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  const imageDefault =
    "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/ecom/playstation5.jpg";

  return (
    <Link href={`/product/${product.id}`}>
      <Card key={product.id} className="hover:shadow-lg h-full">
        <CardHeader>
          <img
            src={product.image || imageDefault}
            alt={product.name}
            className="h-40 w-full object-contain rounded-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="line-clamp-1 mb-1">{product.name}</CardTitle>
          <p className="text-sm text-gray-500">${product.price}</p>
        </CardContent>
        <CardFooter>
          <CardDescription className="line-clamp-4">
            {product.description}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
