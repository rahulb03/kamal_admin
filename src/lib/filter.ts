import type { Product } from "@/types/product"

export type FilterOptions = {
  search: string
  category: string
  priceRange: string
  stockRange: string
}

const parseRange = (range: string): [number, number] => {
  if (!range) return [0, Number.POSITIVE_INFINITY]

  if (range.endsWith("+")) {
    const min = Number.parseInt(range.slice(0, -1))
    return [min, Number.POSITIVE_INFINITY]
  }

  const [min, max] = range.split("-").map((num) => Number.parseFloat(num))
  return [min, max]
}

export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  return products.filter((product) => {
    const matchesSearch =
      filters.search === "" ||
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.id.toString().includes(filters.search) ||
      product.category?.name.toLowerCase().includes(filters.search.toLowerCase())

    const matchesCategory =
      filters.category === "" || product.category?.name.toLowerCase() === filters.category.toLowerCase()

    const [minStock, maxStock] = parseRange(filters.stockRange)
    const matchesStock = product.stock >= minStock && product.stock <= maxStock

    const [minPrice, maxPrice] = parseRange(filters.priceRange)
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice

    return matchesSearch && matchesCategory && matchesStock && matchesPrice
  })
}

export const getUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map((product) => product.category?.name || "").filter(Boolean)
  return Array.from(new Set(categories))
}

