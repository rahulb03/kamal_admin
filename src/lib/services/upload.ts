import { STRAPI_URL } from "@/config/constant";
import axios from "axios";

export async function uploadImage(file: File) {
    try {
      const formData = new FormData();
      formData.append("files", file); // ✅ Correct way to upload
  
      const response = await axios.post(`${STRAPI_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // ✅ Returns image details (including ID)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Image upload failed");
    }
  }
  