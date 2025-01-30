"use client"

import type React from "react"
import { useState } from "react"
import { useProductContext } from "@/lib/context/product-context"
import Image from "next/image"
import { STRAPI_URL } from "@/config/constant"
import ProductForm from "./addmodal"
import { exportToPDF } from "@/lib/pdf"
import DeleteModal from "@/modal/deletemodal"
// import { useDeleteProduct } from "@/hooks/usedeleteproduct"
import { useDeleteItem } from "@/hooks/usedeleteproduct"
import { useProductFilters } from "@/hooks/useproductfilter"
import type { Product } from "@/types/product"
import FilterBar from "./filters"

const ProductTable: React.FC = () => {
  const { products , removeProduct , fetchAllProducts} = useProductContext()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  // const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel } = useDeleteProduct()
  const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, itemType } = useDeleteItem({
    removeItem: removeProduct,
    fetchAllItems: fetchAllProducts,
    itemType: "product",
  })
  const { filters, categories, filteredProducts, handleFilterChange } =
    useProductFilters(products)

  const handleSelectProduct = (documentId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const handleAddClick = () => {
    setSelectedProduct(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setIsFormOpen(true)
  }

  return (
    <div className="overflow-x-auto p-4">
      <FilterBar
        filters={filters}
        categories={categories}
      
        handleFilterChange={handleFilterChange}
        handleAddClick={handleAddClick}
        handleExportPDF={() => exportToPDF(selectedProducts, products)}
        selectedProductsCount={selectedProducts.length}
      />

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">
              <input
                type="checkbox"
                onChange={(e) => setSelectedProducts(e.target.checked ? filteredProducts.map((p) => p.documentId) : [])}
                checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
              />
            </th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => {
            const imageUrl = product.image?.url ? `${STRAPI_URL}${product.image.url}` : "/placeholder.svg"
            return (
              <tr key={product.documentId} className="text-center">
                <td className="py-2 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.documentId)}
                    onChange={() => handleSelectProduct(product.documentId)}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Image src={imageUrl || "/placeholder.svg"} alt={product.name} width={50} height={50} />
                </td>
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">{product.category?.name || "N/A"}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => handleEditClick(product)} className="text-blue-500 mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(product)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {isFormOpen && <ProductForm product={selectedProduct} onClose={() => setIsFormOpen(false)} />}
      {/* <DeleteModal isOpen={isDeleteModalOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} /> */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemType={itemType}
      />
    </div>
  )
}

export default ProductTable

