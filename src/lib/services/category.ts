
import axios from "axios";
import { headers, STRAPI_URL } from "@/config/constant";
import { uploadImage } from "./upload";

// category Interface


interface category {
  documentId: string;
  id:number;
  name: string;
  fabric: string;
}
interface ApiResponse<T> {
  data: T;
}

// Fetch all categorys
export async function fetch_category(): Promise<ApiResponse<category[]>> {
  try {
    const response = await axios.get<ApiResponse<category[]>>(
      `${STRAPI_URL}/api/categories?populate=*`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch categorys",
    );
  }
}

// Fetch a single category by ID
export async function fetch_categoryById(
  documentId: string,
): Promise<ApiResponse<category>> {
  try {
    const response = await axios.get<ApiResponse<category>>(
      `${STRAPI_URL}/api/categories/${documentId}`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch the category",
    );
  }
}

// Create a new category
export async function create_category(
  categoryData: Partial<category>,
): Promise<ApiResponse<category>> {
  try {
    const response = await axios.post<ApiResponse<category>>(
      `${STRAPI_URL}/api/categories`,
      { data: categoryData },
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to create the category",
    );
  }
}

// Update an existing category by ID
export async function update_category(
  documentId: string,
  updatedData: Partial<category>,
): Promise<ApiResponse<category>> {
  try {
    const response = await axios.put<ApiResponse<category>>(
      `${STRAPI_URL}/api/categories/${documentId}`,
      { data: updatedData },
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to update the category",
    );
  }
}

// Delete a category by ID
export async function delete_category(
  documentId: string,
): Promise<ApiResponse<{}>> {
  try {
    const response = await axios.delete<ApiResponse<{}>>(
      `${STRAPI_URL}/api/categories/${documentId}`,
      { headers },
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to delete the category",
    );
  }
}

// // Handle FormData for file uploads
// export async function uploadcategoryImage(file: File): Promise<string> {
//   try {
//     const formData = new FormData();
//     formData.append("files", file);

//     const response = await axios.post<ApiResponse<Image>>(
//       `${STRAPI_URL}/api/upload`,
//       formData,
//       { headers: { ...headers, "Content-Type": "multipart/form-data" } },
//     );
//     return response.data.data.url;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Failed to upload image");
//   }
// }
