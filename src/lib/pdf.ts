

// "use client"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autoTable"
// import type { Product } from "@/types/product"
// import { STRAPI_URL } from "@/config/constant"

// export const exportToPDF = async (selectedProducts: string[], products: Product[]) => {
//   if (selectedProducts.length === 0) {
//     alert("Please select at least one product to export.")
//     return
//   }

//   const doc = new jsPDF()
//   doc.text("Product List", 14, 10)

//   const tableData = []
//   let yOffset = 30 // Starting Y position for images

//   for (const id of selectedProducts) {
//     const product = products.find((p) => p.documentId === id)
//     if (!product) continue

    

//     const imageUrl = product.image?.url ? `${STRAPI_URL}${product.image.url}` : "/placeholder.svg"

//     try {
//       // Fetch the image
//       const imgData = await fetchImageAsBase64(imageUrl)

//       // Add image to the PDF
//       const imgWidth = 30
//       const imgHeight = 30
//       doc.addImage(imgData, "JPEG", 150, yOffset, imgWidth, imgHeight)
//       yOffset += imgHeight + 10 // Increase Y offset for next image

//       tableData.push([
//         product.id || "N/A",
//         product.name || "N/A",
//         product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A",
//         product.category?.name || "N/A",
//         "Image added separately", // Placeholder text for image column
//         product.stock !== undefined ? product.stock.toString() : "N/A",
//       ])
//     } catch (error) {
//       console.error("Error adding image for product:", product.id, error)
//       tableData.push([
//         product.id || "N/A",
//         product.name || "N/A",
//         product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A",
//         product.category?.name || "N/A",
//         "Image not available",
//         product.stock !== undefined ? product.stock.toString() : "N/A",
//       ])
//     }
//   }

//   if (tableData.length === 0) {
//     alert("No valid products found for export.")
//     return
//   }

//   autoTable(doc, {
//     startY: yOffset + 10, // Start table after the images
//     head: [["ID", "Name", "Price", "Category", "Image", "Stock"]],
//     body: tableData,
//   })

//   doc.save("products.pdf")
// }

// // Helper function to fetch image and convert to base64
// async function fetchImageAsBase64(url: string): Promise<string> {
//   const response = await fetch(url)
//   const blob = await response.blob()
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result as string)
//     reader.onerror = reject
//     reader.readAsDataURL(blob)
//   })
// }



"use client"
import jsPDF from "jspdf"
import autoTable from "jspdf-autoTable"
import type { Product } from "@/types/product"
import { STRAPI_URL } from "@/config/constant"

export const exportToPDF = async (selectedProducts: string[], products: Product[]) => {
  if (selectedProducts.length === 0) {
    alert("Please select at least one product to export.")
    return
  }

  const doc = new jsPDF()
  doc.text("Product List", 14, 10)

  const tableData = []
  let yOffset = 30 // Starting Y position for images

  for (const id of selectedProducts) {
    const product = products.find((p) => p.documentId === id)
    if (!product) continue

    const imageUrls = product.image?.length ? product.image.map(img => `${STRAPI_URL}${img.url}`) : ["/placeholder.svg"]
    let imgYOffset = yOffset

    try {
      for (const imageUrl of imageUrls) {
        // Fetch the image
        const imgData = await fetchImageAsBase64(imageUrl)

        // Add image to the PDF
        const imgWidth = 30
        const imgHeight = 30
        doc.addImage(imgData, "JPEG", 150, imgYOffset, imgWidth, imgHeight)
        imgYOffset += imgHeight + 5 // Increase Y offset for next image
      }

      tableData.push([
        product.id || "N/A",
        product.name || "N/A",
        product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A",
        product.category?.name || "N/A",
        `Contains ${imageUrls.length} images`, // Placeholder text for image column
        product.stock !== undefined ? product.stock.toString() : "N/A",
      ])
    } catch (error) {
      console.error("Error adding images for product:", product.id, error)
      tableData.push([
        product.id || "N/A",
        product.name || "N/A",
        product.price !== undefined ? `$${product.price.toFixed(2)}` : "N/A",
        product.category?.name || "N/A",
        "Images not available",
        product.stock !== undefined ? product.stock.toString() : "N/A",
      ])
    }
    yOffset = Math.max(yOffset, imgYOffset) + 10 // Adjust Y offset for the next product
  }

  if (tableData.length === 0) {
    alert("No valid products found for export.")
    return
  }

  autoTable(doc, {
    startY: yOffset, // Start table after the images
    head: [["ID", "Name", "Price", "Category", "Images", "Stock"]],
    body: tableData,
  })

  doc.save("products.pdf")
}

// Helper function to fetch image and convert to base64
async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}