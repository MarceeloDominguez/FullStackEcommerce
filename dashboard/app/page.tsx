import { listProducts } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";
import { Card } from "@/components/ui/card";
import { SquarePlus } from "lucide-react";

export default async function Home() {
  const products = await listProducts();

  return (
    <div className="lg:w-3/4 container mx-auto p-4 lg:ml-48 lg:mt-14 flex-1">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card className="flex justify-center items-center md:h-full h-44 bg-slate-900 shadow-none border-none">
          <SquarePlus size={100} color="#fff" />
        </Card>
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
