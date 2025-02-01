// import type React from "react"
// import type { FilterOptions } from "@/lib/filter"

// interface FilterBarProps {
//   filters: FilterOptions
//   categories: string[]
//   handleFilterChange: (name: string, value: string) => void
//   // handleAddClick: () => void
//   handleExportPDF: () => void
//   selectedProductsCount: number
// }

// const FilterBar: React.FC<FilterBarProps> = ({
//   filters,
//   categories,
//   handleFilterChange,
//   // handleAddClick,
//   handleExportPDF,
//   selectedProductsCount,
// }) => {
//   return (
//     <div className="flex flex-wrap gap-4 mb-4">
//       <input
//         type="text"
//         name="search"
//         placeholder="Search by name, ID, or category"
//         value={filters.search}
//         onChange={(e) => handleFilterChange("search", e.target.value)}
//         className="px-2 py-1 border rounded"
//       />

//       <select
//         name="category"
//         value={filters.category}
//         onChange={(e) => handleFilterChange("category", e.target.value)}
//         className="px-2 py-1 border rounded"
//       >
//         <option value="">All Categories</option>
//         {categories.map((category) => (
//           <option key={category} value={category}>
//             {category}
//           </option>
//         ))}
//       </select>

//       <select
//         name="priceRange"
//         value={filters.priceRange}
//         onChange={(e) => handleFilterChange("priceRange", e.target.value)}
//         className="px-2 py-1 border rounded"
//       >
//         <option value="">All Prices</option>
//         <option value="1-5.99">$1.00 - $5.99</option>
//         <option value="6-10.99">$6.00 - $10.99</option>
//         <option value="11-15.99">$11.00 - $15.99</option>
//         <option value="16-20.99">$16.00 - $20.99</option>
//         <option value="21-25.99">$21.00 - $25.99</option>
//         <option value="26-30">$26.00 - $30.00</option>
//       </select>

//       <select
//         name="stockRange"
//         value={filters.stockRange}
//         onChange={(e) => handleFilterChange("stockRange", e.target.value)}
//         className="px-2 py-1 border rounded"
//       >
//         <option value="">All Stock</option>
//         <option value="0-10">0 - 10</option>
//         <option value="11-25">11 - 25</option>
//         <option value="26-50">26 - 50</option>
//         <option value="51-100">51 - 100</option>
//         <option value="101-200">101 - 200</option>
//         <option value="201+">201+</option>
//       </select>

//       <button
//         onClick={handleExportPDF}
//         disabled={selectedProductsCount === 0}
//         className={`px-4 py-2 rounded ${
//           selectedProductsCount ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"
//         }`}
//       >
//         Export to PDF
//       </button>
//       {/* <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded">
//         Add Product
//       </button> */}
//     </div>
//   )
// }

// export default FilterBar


import type React from "react"
import type { FilterOptions } from "@/lib/filter"
import { FileDown , ChevronDown} from "lucide-react"

interface FilterBarProps {
  filters: FilterOptions
  categories: string[]
  handleFilterChange: (name: string, value: string) => void
  handleExportPDF: () => void
  selectedProductsCount: number
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  categories,
  handleFilterChange,
  handleExportPDF,
  selectedProductsCount,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex-grow sm:flex-grow-0">
        <select
          name="category"
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
      </div>

      <div className="flex-grow sm:flex-grow-0">
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={(e) => handleFilterChange("priceRange", e.target.value)}
          className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="">All Prices</option>
          <option value="1-5.99">$1.00 - $5.99</option>
          <option value="6-10.99">$6.00 - $10.99</option>
          <option value="11-15.99">$11.00 - $15.99</option>
          <option value="16-20.99">$16.00 - $20.99</option>
          <option value="21-25.99">$21.00 - $25.99</option>
          <option value="26-30">$26.00 - $30.00</option>
        </select>
        {/* <ChevronDown className="absolute  left-10 transform  text-gray-400 " /> */}
      </div>

      <div className="flex-grow sm:flex-grow-0">
        <select
          name="stockRange"
          value={filters.stockRange}
          onChange={(e) => handleFilterChange("stockRange", e.target.value)}
          className="w-full sm:w-auto px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
        >
          <option value="">All Stock</option>
          <option value="0-10">0 - 10</option>
          <option value="11-25">11 - 25</option>
          <option value="26-50">26 - 50</option>
          <option value="51-100">51 - 100</option>
          <option value="101-200">101 - 200</option>
          <option value="201+">201+</option>
        </select>
        {/* <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" /> */}
      </div>

      <button
        onClick={handleExportPDF}
        disabled={selectedProductsCount === 0}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out flex items-center ${
          selectedProductsCount > 0
            ? "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <FileDown className="w-4 h-4 mr-2" />
        Export ({selectedProductsCount})
      </button>
    </div>
  )
}

export default FilterBar

