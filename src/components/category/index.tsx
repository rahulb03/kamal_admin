"use client"

import React, { useState } from "react"
import { useCategoryContext } from "@/lib/context/category-context"
import { useDeleteItem } from "@/hooks/usedeleteproduct"
import DeleteModal from "@/modal/deletemodal"
import type { Category as CategoryType } from "@/types/category"
import CategoryForm from "./addeditmodl"
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, XIcon } from 'lucide-react'

const CategoryManagement: React.FC = () => {
  const { categories, removeCategory, fetchAllCategories } = useCategoryContext()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.id.toString().includes(searchTerm) ||
    (category.fabric && category.fabric.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="bg-white min-h-screen  -z-2">
      <div className=" top-0 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
            <button
              onClick={handleAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition duration-300 ease-in-out flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      <div className= "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg  border border-gray-200">
          <div className="p-4 border-b border-gray-200 overflow-y-hidden  ">
            {/* <div className="  ">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                // className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              )}
            </div> */}
              <div className="flex items-center flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 w-full">
                        <SearchIcon className="text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search categories..."
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
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fabric</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.documentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.fabric || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(category)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <PencilIcon className="w-5 h-5 inline" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(category)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="w-5 h-5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-gray-500">No categories found</div>
          )}
        </div>
      </div>

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

export default CategoryManagement
