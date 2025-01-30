"use client"
import jsPDF from "jspdf";
import autoTable from "jspdf-autoTable";
import { Product } from "@/types/product"; // Ensure correct type reference
import { STRAPI_URL } from "@/config/constant";

export const exportToPDF = (selectedProducts: string[], products: Product[]) => {
  if (selectedProducts.length === 0) {
    alert("Please select at least one product to export.");
    return;
  }

  const doc = new jsPDF();
  doc.text("Product List", 14, 10);
   

  
  const tableData = selectedProducts
    .map((id) => {
      const product = products.find((p) => p.documentId === id);

      if (!product) return null;
      const imageUrl = product.image?.url ? `${STRAPI_URL}${product.image.url}` : "/placeholder.svg"
   
      return [
        product.id || "N/A",
        product.name || "N/A",
        product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A",
        product.category?.name || "N/A",
       imageUrl ,
        product.stock !== undefined ? product.stock : "N/A",
      ];
    })
    .filter(Boolean) as string[][]; // Remove null values

  if (tableData.length === 0) {
    alert("No valid products found for export.");
    return;
  }

  autoTable(doc, {
    head: [["ID", "Name", "Price", "Category", " image" , "Stock"]],
    body: tableData,
  });

  doc.save("products.pdf");
};
