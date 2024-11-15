import { listProducts } from "@/api/products";
import ProductListItem from "@/components/ProductListItem";

export default async function Home() {
  const products = await listProducts();

  return (
    <div className="lg:w-3/4 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
