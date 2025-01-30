"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"
import {
  fetch_category,
  fetch_categoryById,
  create_category,
  update_category,
  delete_category,
} from "../services/category"

// import type { Category } from "@/types/category"
interface Category {
  documentId: string
  id: number
  name: string
  fabric: string
}

interface CategoryContextProps {
  categories: Category[]
  loading: boolean
  error: string | null
  fetchAllCategories: () => Promise<void>
  fetchCategory: (documentId: string) => Promise<Category | null>
  addCategory: (categoryData: Partial<Category>) => Promise<void>
  editCategory: (documentId: string, updatedData: Partial<Category>) => Promise<void>
  removeCategory: (documentId: string) => Promise<void>
}

const CategoryContext = createContext<CategoryContextProps | undefined>(undefined)

interface CategoryProviderProps {
  children: ReactNode
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((err: any) => {
    const message = err?.response?.data?.message || err?.message || "Something went wrong."
    setError(message)
  }, [])

  const fetchAllCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch_category()
      setCategories(response.data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [handleError])

  const fetchCategory = useCallback(
    async (documentId: string) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch_categoryById(documentId)
        return response.data
      } catch (err) {
        handleError(err)
        return null
      } finally {
        setLoading(false)
      }
    },
    [handleError],
  )

  const addCategory = useCallback(
    async (categoryData: Partial<Category>) => {
      setError(null)
      try {
        const newCategory = await create_category(categoryData)
        setCategories((prevCategories) => [...prevCategories, newCategory.data])
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  const editCategory = useCallback(
    async (documentId: string, updatedData: Partial<Category>) => {
      setError(null)
      try {
        const updatedCategory = await update_category(documentId, updatedData)
        setCategories((prevCategories) =>
          prevCategories.map((category) => (category.documentId === documentId ? updatedCategory.data : category)),
        )
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  const removeCategory = useCallback(
    async (documentId: string) => {
      setError(null)
      try {
        await delete_category(documentId)
        setCategories((prevCategories) => prevCategories.filter((category) => category.documentId !== documentId))
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  useEffect(() => {
    fetchAllCategories()
  }, [fetchAllCategories])

  const contextValue = useMemo(
    () => ({
      categories,
      loading,
      error,
      fetchAllCategories,
      fetchCategory,
      addCategory,
      editCategory,
      removeCategory,
    }),
    [categories, loading, error, fetchAllCategories, fetchCategory, addCategory, editCategory, removeCategory],
  )

  return <CategoryContext.Provider value={contextValue}>{children}</CategoryContext.Provider>
}

export const useCategoryContext = (): CategoryContextProps => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider")
  }
  return context
}

