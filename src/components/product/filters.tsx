import type React from "react"
import type { FilterOptions } from "@/lib/filter"

interface FilterBarProps {
  filters: FilterOptions
  categories: string[]
  handleFilterChange: (name: string, value: string) => void
  handleAddClick: () => void
  handleExportPDF: () => void
  selectedProductsCount: number
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  categories,
  handleFilterChange,
  handleAddClick,
  handleExportPDF,
  selectedProductsCount,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        name="search"
        placeholder="Search by name, ID, or category"
        value={filters.search}
        onChange={(e) => handleFilterChange("search", e.target.value)}
        className="px-2 py-1 border rounded"
      />

      <select
        name="category"
        value={filters.category}
        onChange={(e) => handleFilterChange("category", e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="priceRange"
        value={filters.priceRange}
        onChange={(e) => handleFilterChange("priceRange", e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="">All Prices</option>
        <option value="1-5.99">$1.00 - $5.99</option>
        <option value="6-10.99">$6.00 - $10.99</option>
        <option value="11-15.99">$11.00 - $15.99</option>
        <option value="16-20.99">$16.00 - $20.99</option>
        <option value="21-25.99">$21.00 - $25.99</option>
        <option value="26-30">$26.00 - $30.00</option>
      </select>

      <select
        name="stockRange"
        value={filters.stockRange}
        onChange={(e) => handleFilterChange("stockRange", e.target.value)}
        className="px-2 py-1 border rounded"
      >
        <option value="">All Stock</option>
        <option value="0-10">0 - 10</option>
        <option value="11-25">11 - 25</option>
        <option value="26-50">26 - 50</option>
        <option value="51-100">51 - 100</option>
        <option value="101-200">101 - 200</option>
        <option value="201+">201+</option>
      </select>

      <button
        onClick={handleExportPDF}
        disabled={selectedProductsCount === 0}
        className={`px-4 py-2 rounded ${
          selectedProductsCount ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Export to PDF
      </button>
      <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </div>
  )
}

export default FilterBar

