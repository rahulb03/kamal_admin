"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode, useCallback, useMemo } from "react"
import { fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct } from "../services/product"
import type { Product } from "@/types/product"

interface ProductContextProps {
  products: Product[]
  loading: boolean
  error: string | null
  fetchAllProducts: () => Promise<void>
  fetchProduct: (documentId: string) => Promise<Product | null>
  addProduct: (productData: Partial<Product>) => Promise<void>
  editProduct: (documentId: string, updatedData: Partial<Product>) => Promise<void>
  removeProduct: (documentId: string) => Promise<void>
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined)

interface ProductProviderProps {
  children: ReactNode
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleError = useCallback((err: any) => {
    const message = err?.response?.data?.message || err?.message || "Something went wrong."
    setError(message)
  }, [])

  const fetchAllProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchProducts()
      setProducts(response.data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoading(false)
    }
  }, [handleError])

  const fetchProduct = useCallback(
    async (documentId: string) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchProductById(documentId)
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

  const addProduct = useCallback(
    async (productData: Partial<Product>) => {
      setError(null)
      try {
        const newProduct = await createProduct(productData)
        setProducts((prevProducts) => [...prevProducts, newProduct.data])
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  const editProduct = useCallback(
    async (documentId: string, updatedData: Partial<Product>) => {
      setError(null)
      try {
        const updatedProduct = await updateProduct(documentId, updatedData)
        setProducts((prevProducts) =>
          prevProducts.map((product) => (product.documentId === documentId ? updatedProduct.data : product)),
        )
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  const removeProduct = useCallback(
    async (documentId: string) => {
      setError(null)
      try {
        await deleteProduct(documentId)
        setProducts((prevProducts) => prevProducts.filter((product) => product.documentId !== documentId))
      } catch (err) {
        handleError(err)
      }
    },
    [handleError],
  )

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  const contextValue = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchAllProducts,
      fetchProduct,
      addProduct,
      editProduct,
      removeProduct,
    }),
    [products, loading, error, fetchAllProducts, fetchProduct, addProduct, editProduct, removeProduct],
  )

  return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
}

export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }
  return context
}

