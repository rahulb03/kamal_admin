
"use client"

import type React from "react"
import { useState } from "react"
import { useProductContext } from "@/lib/context/product-context"
import { STRAPI_URL } from "@/config/constant"
import { useImageUpload } from "@/hooks/useimageupload"
import Image from 'next/image';
import { Category } from "@/types/category"
import { useCategoryContext } from "@/lib/context/category-context"


interface FormData {
  name: string
  price: number
  stock: number
  category: string
  image: File | null
}

interface ProductFormProps {
  product?: any
  onClose: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const { products,  addProduct, editProduct } = useProductContext()
  const {categories} = useCategoryContext();
  const { uploadImage, deleteImage, uploadError } = useImageUpload()
  const isEditing = !!product

  const [formData, setFormData] = useState<FormData>({
    name: product?.name || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category?.id || "",
    image: null,
  })
 
  // const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // let imageObj =  { id: product.image.id, url: product.image.url } 
      let imageObj = product?.image ? { id: product.image.id, url: product.image.url } : null;

      // let imageObj =  { id: product.image.id, url: product.image.url } ;

      if (formData.image) {
        if (imageObj) {
          await deleteImage(Number(imageObj.id))
        }

        const uploadedImage = await uploadImage(formData.image)
        if (!uploadedImage) {
          throw new Error(uploadError || "Failed to upload image.")
        }
        imageObj = uploadedImage
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: {name : formData.category},
        image: imageObj,
      }

      if (isEditing) {
        await editProduct(product.documentId, productData)
      } else {
        await addProduct(productData)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-2 p-2 border"
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mb-2 p-2 border"
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full mb-2 p-2 border"
            placeholder="Stock"
            required
          />

          <select name="category" value={formData.category} onChange={handleChange} className="w-full mb-2 p-2 border">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input type="file" onChange={handleFileChange} className="w-full mb-2 p-2 border" />

          {product?.image?.[0]?.url && (
            <div className="mb-2">
              <p className="text-gray-500 text-sm">Current Image:</p>
              <Image
                src={`${STRAPI_URL}${product.image[0].url}`}
                alt="Product"
                className="w-20 h-20 object-cover rounded mt-1"
                fill
              />
            </div>
          )}

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
        <button onClick={onClose} className="mt-2 p-2 w-full bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ProductForm

