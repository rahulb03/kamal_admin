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



import type React from "react"

interface DeleteModalProps {
  isOpen: boolean
  onCancel: () => void
  onConfirm: () => void
  itemType: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onConfirm, itemType }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this {itemType}?</p>
        <div className="flex justify-evenly gap-10 mt-4">
           <button onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded">
            Delete
          </button>
          <button onClick={onCancel} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          {/* <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default DeleteModal

