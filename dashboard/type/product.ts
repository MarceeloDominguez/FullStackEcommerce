export interface Product {
  id: number;
  name: string;
  description: string;
  image: string | undefined;
  price: number;
}

export interface InsertProduct {
  name: string;
  description: string;
  image: File | null;
  price: number;
}
