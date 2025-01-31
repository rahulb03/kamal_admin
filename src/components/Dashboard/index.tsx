"use client"

import { useState, useEffect, use } from "react"
import { Boxes, AlertTriangle, Tags } from "lucide-react"
import axios from "axios"
import { getdetails } from "@/lib/services/dashboard"
import { fetchProducts } from "@/lib/services/product"
// Mock data (replace with actual data fetching in a real application)

const inventoryData = {
  totalCategories: 8,
  lowStockAlerts: 5,
  totalProduct: 42,
}
// console.log("rahul")
export default function EnhancedInventoryOverview() {
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState<string | null>(null);


  const [data , setData ] = useState({
    lowStockProducts: 0,
    totalCategories: 0,
    totalProduct: 0,
  })


  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getdetails();
        // console.log(result)
        setData(result);
        setError(null); // Clear any previous errors
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();

   } , []);




  

//   fetch products 

   
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8">Inventory Overview</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Categories"
          value={data.totalCategories}
          icon={<Boxes className="h-8 w-8" />}
          description="Product categories in inventory"
          color="from-blue-500 to-blue-600"
          delay="delay-100"
          isVisible={isVisible}
        />
        <StatCard
          title="Low-stock Alerts"
          value={data.lowStockProducts}
          icon={<AlertTriangle className="h-8 w-8" />}
          description="Products below stock threshold"
          color="from-red-500 to-red-600"
          delay="delay-200"
          isVisible={isVisible}
        />
        <StatCard
          title="Total Product Types"
          value={data.totalProduct}
          icon={<Tags className="h-8 w-8" />}
          description="Unique product categories"
          color="from-green-500 to-green-600"
          delay="delay-300"
          isVisible={isVisible}
        />
      </div>
    </div>
  )

}
interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
  color: string
  delay: string
  isVisible: boolean
}

function StatCard({ title, value, icon, description, color, delay, isVisible }: StatCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} ${delay}`}
    >
      <div className={`p-4 bg-gradient-to-r ${color}`}> 
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="text-white opacity-80">{icon}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-baseline">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
          {/* <span className="ml-2 text-sm font-medium text-gray-500">units</span> */}
        </div>
        <p className="mt-3 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}



