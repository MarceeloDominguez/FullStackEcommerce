import { FlatList } from "react-native";
import React from "react";
import products from "@/assets/product.json";
import ProductListItem from "@/components/ProductListItem";

export default function HomeScreen() {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-2"
      columnWrapperClassName="gap-2"
      contentContainerStyle={{ padding: 8, backgroundColor: "#f7f2f2" }}
    />
  );
}
