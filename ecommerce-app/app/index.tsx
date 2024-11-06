import { FlatList } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { Product } from "@/type/product";
import SkeletonProduct from "@/components/SkeletonProduct";
import { Text } from "@/components/ui/text";
import { useProducts } from "@/queries/products";

export default function HomeScreen() {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return <Text>Error fetching products</Text>;
  }

  return (
    <FlatList<Product>
      data={isLoading ? Array.from({ length: 10 }) : products}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) =>
        isLoading ? <SkeletonProduct /> : <ProductListItem product={item} />
      }
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      contentContainerStyle={{ padding: 8, backgroundColor: "#f7f2f2" }}
    />
  );
}
