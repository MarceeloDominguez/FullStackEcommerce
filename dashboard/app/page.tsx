"use client";
import ProductListItem from "@/components/ProductListItem";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/queries/products";
import { SquarePlus } from "lucide-react";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="lg:w-3/4 container mx-auto p-4 lg:ml-48 mt-14 flex-1">
      {isLoading ? (
        <Skeleton className="h-8 w-44 mb-6" />
      ) : (
        <h1 className="text-2xl font-bold mb-6">Products</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <Skeleton className="md:h-full h-44" />
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="h-[355px] w-full" />
              </Card>
            ))}
          </>
        ) : (
          <>
            <Card className="flex justify-center items-center md:h-full h-44 bg-slate-900 shadow-none border-none">
              <SquarePlus size={100} color="#fff" />
            </Card>
            {products?.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
