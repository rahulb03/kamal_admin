

export type ImageType = {
  id: number;
  url: string;
};


export type Product = {
  documentId: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  category: {
    name: string;
    id: number;
  };
  image: {
    id: string;
    url: string;
  };
  // image?: ImageType[] ; // Handle both single object and array cases

}