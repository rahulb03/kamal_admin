

// "use client"

// import React, { useState } from "react"
// import { useCategoryContext } from "@/lib/context/category-context"

// interface FormData {
//   name: string
//   fabric: string
// }

// interface CategoryFormProps {
//   category?: any
//   onClose: () => void
// }

// const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
//   const { addCategory, editCategory } = useCategoryContext()
//   const isEditing = !!category

//   const [formData, setFormData] = useState<FormData>({
//     name: category?.name || "",
//     fabric: category?.fabric || "",
//   })

//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     try {
//       const categoryData = {
//         name: formData.name,
//         fabric: formData.fabric,
//       }

//       if (isEditing) {
//         await editCategory(category.documentId, categoryData)
//       } else {
//         await addCategory(categoryData)
//       }

//       onClose()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save category.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96">
//         <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Category" : "Add Category"}</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border"
//             placeholder="Category Name"
//             required
//           />
//           <input
//             type="text"
//             name="fabric"
//             value={formData.fabric}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border"
//             placeholder="Fabric"
//             required
//           />

//           <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </form>
//         <button onClick={onClose} className="mt-2 p-2 w-full bg-gray-500 text-white rounded">
//           Cancel
//         </button>
//       </div>
//     </div>
//   )
// }

// export default CategoryForm


"use client"

import type React from "react"
import { useState } from "react"
import { useCategoryContext } from "@/lib/context/category-context"
import { X } from "lucide-react"

interface FormData {
  name: string
  fabric: string
}

interface CategoryFormProps {
  category?: any
  onClose: () => void
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
  const { addCategory, editCategory } = useCategoryContext()
  const isEditing = !!category

  const [formData, setFormData] = useState<FormData>({
    name: category?.name || "",
    fabric: category?.fabric || "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const categoryData = {
        name: formData.name,
        fabric: formData.fabric,
      }

      if (isEditing) {
        await editCategory(category.documentId, categoryData)
      } else {
        await addCategory(categoryData)
      }

      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? "Edit Category" : "Add Category"}</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>
          <div>
            <label htmlFor="fabric" className="block text-sm font-medium text-gray-700 mb-1">
              Fabric
            </label>
            <input
              type="text"
              id="fabric"
              name="fabric"
              value={formData.fabric}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter fabric type"
              required
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm

