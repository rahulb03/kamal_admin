import { useState, useMemo } from "react"
import type { Product } from "@/types/product"
import { filterProducts, getUniqueCategories, type FilterOptions } from "@/lib/filter"

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    category: "",
    priceRange: "",
    stockRange: "",
  })

  const categories = useMemo(() => getUniqueCategories(products), [products])
  const filteredProducts = useMemo(() => filterProducts(products, filters), [products, filters])

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return {
    filters,
    categories,
    filteredProducts,
    handleFilterChange,
  }
}

