"use client";
import { getProductById } from "@/api/products";
import LayoutPage from "@/components/LayoutPage";
import OrderListDetails from "@/components/OrderListDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetOrderById } from "@/queries/orders";
import { useQuery } from "@tanstack/react-query";

type ParamsProps = {
  params: { id: string };
};

export default function OrderDetails({ params }: ParamsProps) {
  const { data: orderListProducts, isPending } = useGetOrderById(
    Number(params.id)
  );

  const orderedProducts =
    orderListProducts?.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })) ?? [];

  const { data: products } = useQuery({
    queryKey: ["products", orderedProducts],
    queryFn: async () => {
      const productData = await Promise.all(
        orderedProducts.map(async ({ productId, quantity }) => {
          const product = await getProductById(productId);
          return { ...product, quantity };
        })
      );
      return productData;
    },
    enabled: orderedProducts.length > 0,
  });

  const priceTotal = products?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <LayoutPage>
      <h2 className="text-2xl font-bold mb-6">Order details #{params.id}</h2>
      <div className="grid md:grid-cols-2 gap-5">
        {isPending ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="md:h-[155px] h-28" />
            ))}
          </>
        ) : (
          <>
            {products?.map((item, index) => (
              <OrderListDetails key={index} product={item} />
            ))}
          </>
        )}
      </div>
      {isPending ? (
        <Skeleton className="h-8 w-56 mt-6" />
      ) : (
        products && (
          <p className="text-lg font-bold mt-6 text-slate-700">
            Total: ${priceTotal}
          </p>
        )
      )}
    </LayoutPage>
  );
}
