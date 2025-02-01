"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { useProductContext } from "@/lib/context/product-context"
import { STRAPI_URL } from "@/config/constant"
import ProductForm from "./addmodal"
import { exportToPDF } from "@/lib/pdf"
import DeleteModal from "@/modal/deletemodal"
import { useDeleteItem } from "@/hooks/usedeleteproduct"
import { useProductFilters } from "@/hooks/useproductfilter"
import type { Product } from "@/types/product"
import FilterBar from "./filters"
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, XIcon } from "lucide-react"

const ProductTable: React.FC = () => {
  const { products, removeProduct, fetchAllProducts } = useProductContext()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, itemType } = useDeleteItem({
    removeItem: removeProduct,
    fetchAllItems: fetchAllProducts,
    itemType: "product",
  })
  const { filters, categories, filteredProducts, handleFilterChange } = useProductFilters(products)

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

  const searchedProducts = filteredProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm) ||
      (product.category?.name && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (


<div className="bg-white min-h-screen">
  <div className="top-0 bg-white z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={handleAddClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-300 ease-in-out flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4 gap-2">
          
          {/* ✅ Fixed Search Bar */}
          <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-md px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 w-96">
            <SearchIcon className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-2 pr-3 outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600">
                <XIcon className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* FilterBar */}
          <FilterBar
            filters={filters}
            categories={categories}
            handleFilterChange={handleFilterChange}
            handleExportPDF={() => exportToPDF(selectedProducts, products)}
            selectedProductsCount={selectedProducts.length}
          />
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedProducts(e.target.checked ? searchedProducts.map((p) => p.documentId) : [])
                  }
                  checked={selectedProducts.length === searchedProducts.length && searchedProducts.length > 0}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchedProducts.map((product) => {
              // const imageUrl = product.image?.url ? `${STRAPI_URL}${product.image.url}` : "/placeholder.svg";
              return (
                <tr key={product.documentId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.documentId)}
                      onChange={() => handleSelectProduct(product.documentId)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  
                  {/* {product.image?.length > 0 ? ( */}
                    {product.image && product.image.length > 0 ? (
              <div className="flex space-x-4">

           { product.image.map((img) => (

              <Image
                key={img.id}
                src={ ` ${STRAPI_URL}${img.url} `|| "/placeholder.svg"} 
                alt={product.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              
            ))}
            </div>

          ) : (
            <Image
              src="/placeholder.svg"
              alt="No Image Available"
              width={100}
              height={100}
              className="rounded-lg"
            />
          )}

                    {/* <Image src={imageUrl || "/placeholder.svg"} alt={product.name} width={50} height={50} className="rounded-full" /> */}

                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEditClick(product)} className="text-blue-600 hover:text-blue-900 mr-4">
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button onClick={() => handleDeleteClick(product)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {searchedProducts.length === 0 && <div className="text-center py-8 text-gray-500">No products found</div>}
    </div>
  </div>

  {isFormOpen && <ProductForm product={selectedProduct} onClose={() => setIsFormOpen(false)} />}
  <DeleteModal isOpen={isDeleteModalOpen} onCancel={handleDeleteCancel} onConfirm={handleDeleteConfirm} itemType={itemType} />
</div>

  )
}

export default ProductTable

