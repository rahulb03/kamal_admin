// import type React from "react"

// interface DeleteModalProps {
//   isOpen: boolean
//   onCancel: () => void
//   onConfirm: () => void
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onConfirm }) => {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96">
//         <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//         <p>Are you sure you want to delete this product?</p>
//         <div className="flex justify-end mt-4">
//           <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
//             Cancel
//           </button>
//           <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DeleteModal



// import type React from "react"

// interface DeleteModalProps {
//   isOpen: boolean
//   onCancel: () => void
//   onConfirm: () => void
//   itemType: string
// }

// const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onConfirm, itemType }) => {
//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96">
//         <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
//         <p>Are you sure you want to delete this {itemType}?</p>
//         <div className="flex justify-evenly gap-10 mt-4">
//            <button onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded">
//             Delete
//           </button>
//           <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
//             Cancel
//           </button>
//           {/* <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
//             Delete
//           </button> */}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DeleteModal

import type React from "react"
import { AlertTriangle, X } from "lucide-react"

interface DeleteModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  itemType: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onConfirm, itemType }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4  border-gray-200">
          {/* <h2 className="text-xl font-semibold text-gray-900">Confirm Delete</h2> */}
          <h2 className="text-2xl font-bold  text-center">Confirm Delete</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            {/* <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" /> */}
            <p className="text-gray-700">Are you sure you want to delete this {itemType}?</p>
          </div>
          <p className="text-sm text-gray-500 mb-4">This action cannot be undone.</p>
          <div className="flex justify-end gap-2 space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          
           
            <button
              onClick={onConfirm}
              // className="px-4 py-2 border bg-red-600 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 "

              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

