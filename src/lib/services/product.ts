import axios from "axios";
import { headers, STRAPI_URL } from "@/config/constant";
import { uploadImage } from "./upload";
import { Product } from "@/types/product";
// Product Interface
type Category = {
  name: string;
  id: string;
};

type Image = {
  url: string;
};

interface ApiResponse<T> {
  data: T;
}

// Fetch all products
export async function fetchProducts(): Promise<ApiResponse<Product[]>> {
  try {
    const response = await axios.get<ApiResponse<Product[]>>(
      `${STRAPI_URL}/api/products?populate=*`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch products",
    );
  }
}

// Fetch a single product by ID
export async function fetchProductById(
  documentId: string,
): Promise<ApiResponse<Product>> {
  try {
    const response = await axios.get<ApiResponse<Product>>(
      `${STRAPI_URL}/api/products/${documentId}`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch the product",
    );
  }
}

// Create a new product
export async function createProduct(
  productData: Partial<Product>,
): Promise<ApiResponse<Product>> {
  try {
    const response = await axios.post<ApiResponse<Product>>(
      `${STRAPI_URL}/api/products`,
      { data: productData },
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create the product",
    );
  }
}

// Update an existing product by ID
export async function updateProduct(
  documentId: string,
  updatedData: Partial<Product>,
): Promise<ApiResponse<Product>> {
  try {
    const response = await axios.put<ApiResponse<Product>>(
      `${STRAPI_URL}/api/products/${documentId}`,
      { data: updatedData },
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update the product",
    );
  }
}

// Delete a product by ID
export async function deleteProduct(
  documentId: string,
): Promise<ApiResponse<{}>> {
  try {
    const response = await axios.delete<ApiResponse<{}>>(
      `${STRAPI_URL}/api/products/${documentId}`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the product",
    );
  }
}

// Handle FormData for file uploads
export async function uploadProductImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("files", file);

    const response = await axios.post<ApiResponse<Image>>(
      `${STRAPI_URL}/api/upload`,
      formData,
      { headers: { ...headers, "Content-Type": "multipart/form-data" } },
    );
    return response.data.data.url;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to upload image");
  }
}
