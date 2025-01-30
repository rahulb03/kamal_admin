import axios from "axios";
import { headers } from "@/config/constant";
import { STRAPI_URL } from "@/config/constant";

// Define the structure of the API response
interface StockAlertsResponse {
  lowStockProducts: number;
  totalCategories: number;
  totalProduct: number;
}

// Retrieve the token from localStorage

export async function getdetails(): Promise<StockAlertsResponse> {
  try {
    const res = await axios.get<StockAlertsResponse>(`${STRAPI_URL}/api/stock-alerts`, {
      headers
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed");
  } finally {
    console.log("done");
  }
}
