// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useCategoryContext } from "../../lib/context/category-context"
// import { useDeleteItem } from "@/hooks/usedeleteproduct"
// import DeleteModal from "@/modal/deletemodal"
// import type { Category  } from "@/types/category"
// import CategoryForm from "./addeditmodl"

// const Category: React.FC = () => {
//   const { categories , removeCategory ,fetchAllCategories }  = useCategoryContext()
//   const [isFormOpen, setIsFormOpen] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
//   const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, itemType } = useDeleteItem({
//     removeItem: removeCategory,
//     fetchAllItems: fetchAllCategories,
//     itemType: "category",
//   })

//    const handleAddClick = () => {
//     setSelectedCategory(null)
//       setIsFormOpen(true)
//     }
  
//     const handleEditClick = (category: Category) => {
//       setSelectedCategory(category)
//       setIsFormOpen(true)
//     }
  

  

//   return (
//     <>
//     <div className="overflow-x-auto p-4">
    
//     <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded">
//         Add Product
//       </button>
//       <table className="min-w-full bg-white border border-gray-300">


//         <thead>
//           <tr className="bg-gray-100">
           
//             <th className="py-2 px-4 border-b">ID</th>
//             <th className="py-2 px-4 border-b">Name</th>
          
//             <th className="py-2 px-4 border-b">fabric</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => {
//             return (
//               <tr key={category.documentId} className="text-center">
              
                
//                 <td className="py-2 px-4 border-b">{category.id}</td>
//                 <td className="py-2 px-4 border-b">{category.name}</td>
//                 <td className="py-2 px-4 border-b">{category.fabric || "N/A"  }</td>
//                 <td className="py-2 px-4 border-b">
//                   <button onClick={() => handleEditClick(category) }  className="text-blue-500 mr-2">
//                     Edit
//                   </button>
//                   <button  onClick={ () => handleDeleteClick(category)} className="text-red-500">
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>

//       {isFormOpen && <CategoryForm category={selectedCategory} onClose={() => setIsFormOpen(false)} />}

//       <DeleteModal
//         isOpen={isDeleteModalOpen}
//         onCancel={handleDeleteCancel}
//         onConfirm={handleDeleteConfirm}
//         itemType={itemType}
//       />
//     </div>
//     </>
//   )
// }

// export default Category



"use client"

import type React from "react"
import { useState } from "react"
import { useCategoryContext } from "@/lib/context/category-context"
import { useDeleteItem } from "@/hooks/usedeleteproduct"
import DeleteModal from "@/modal/deletemodal"
import type { Category as CategoryType } from "@/types/category"
import CategoryForm from "./addeditmodl"

const Category: React.FC = () => {
  const { categories, removeCategory, fetchAllCategories } = useCategoryContext()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const { isDeleteModalOpen, handleDeleteClick, handleDeleteConfirm, handleDeleteCancel, itemType } = useDeleteItem({
    removeItem: removeCategory,
    fetchAllItems: fetchAllCategories,
    itemType: "category",
  })

  const handleAddClick = () => {
    setSelectedCategory(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (category: CategoryType) => {
    setSelectedCategory(category)
    setIsFormOpen(true)
  }

  return (
    <div className="overflow-x-auto p-4">
      <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
        Add Category
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Fabric</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.documentId} className="text-center">
              <td className="py-2 px-4 border-b">{category.id}</td>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">{category.fabric || "N/A"}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditClick(category)} className="text-blue-500 mr-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteClick(category)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isFormOpen && <CategoryForm category={selectedCategory} onClose={() => setIsFormOpen(false)} />}

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemType={itemType}
      />
    </div>
  )
}

export default Category

