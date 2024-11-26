import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { OrderedProducts } from "@/type/order";

type OrderListDetailsProps = {
  product: OrderedProducts;
};

export default function OrderListDetails({ product }: OrderListDetailsProps) {
  return (
    <Card className="p-2 flex gap-4">
      <CardContent className="p-2">
        <img
          src={product.image}
          className="lg:h-32 md:h-28 h-20 w-20 md:w-full object-contain rounded-md"
        />
      </CardContent>
      <CardContent className="flex-1 p-2">
        <CardDescription className="text-sm font-normal">
          {product.quantity} item / ${product.price} p/u
        </CardDescription>
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
        <div className="mt-2">
          <span className="text-base text-slate-700">
            ${product.price * product.quantity}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
