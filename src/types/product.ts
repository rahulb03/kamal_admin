

export type Product = {
  documentId: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  category: {
    name: string;
    // id: string;
  };
  image: {
    id: string;
    url: string;
  };
}