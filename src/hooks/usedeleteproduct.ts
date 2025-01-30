// import { useState } from "react"
// import { useProductContext } from "@/lib/context/product-context"

// export const useDeleteProduct = () => {
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
//   const [productToDelete, setProductToDelete] = useState<any>(null)
//   const { removeProduct, fetchAllProducts } = useProductContext()

//   const handleDeleteClick = (product: any) => {
//     setProductToDelete(product)
//     setIsDeleteModalOpen(true)
//   }

//   const handleDeleteConfirm = async () => {
//     if (productToDelete) {
//       await removeProduct(productToDelete.documentId)
//       setIsDeleteModalOpen(false)
//       fetchAllProducts()
//       setProductToDelete(null)
//     }
//   }

//   const handleDeleteCancel = () => {
//     setIsDeleteModalOpen(false)
//     setProductToDelete(null)
//   }

//   return {
//     isDeleteModalOpen,
//     handleDeleteClick,
//     handleDeleteConfirm,
//     handleDeleteCancel,
//   }
// }



import { useState } from "react"

interface UseDeleteItemProps<T> {
  removeItem: (id: string) => Promise<void>
  fetchAllItems: () => void
  itemType: string
}

export const useDeleteItem = <T extends { documentId: string }>({
  removeItem,
  fetchAllItems,
  itemType,
}: UseDeleteItemProps<T>) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<T | null>(null)

  const handleDeleteClick = (item: T) => {
    setItemToDelete(item)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      await removeItem(itemToDelete.documentId)
      setIsDeleteModalOpen(false)
      fetchAllItems()
      setItemToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setItemToDelete(null)
  }

  return {
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    itemType,
  }
}

