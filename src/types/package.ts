export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};




// // "use client"

// // import type React from "react"
// // import { useState, useEffect, useRef } from "react"
// // import { useProductContext } from "@/lib/context/product-context"
// // import { STRAPI_URL } from "@/config/constant"
// // import { useImageUpload } from "@/hooks/useimageupload"
// // import Image from "next/image"
// // import { useCategoryContext } from "@/lib/context/category-context"
// // import { X, ImageIcon } from "lucide-react"

// // interface FormData {
// //   name: string
// //   price: number
// //   stock: number
// //   category: string
// //   image: File | null
// // }

// // interface ProductFormProps {
// //   product?: any
// //   onClose: () => void
// // }

// // const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
// //   const { addProduct, editProduct } = useProductContext()
// //   const { categories } = useCategoryContext()
// //   const { uploadImage, deleteImage, uploadError } = useImageUpload()
// //   const isEditing = !!product

// //   const [formData, setFormData] = useState<FormData>({
// //     name: product?.name || "",
// //     price: product?.price || 0,
// //     stock: product?.stock || 0,
// //     category: product?.category?.name || "",
// //     image: null,
// //   })

// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
// //   const fileInputRef = useRef<HTMLInputElement>(null)

// //   useEffect(() => {
// //     if (product?.image?.[0]?.url) {
// //       setPreviewUrl(`${STRAPI_URL}${product.image[0].url}`)
// //     }
// //   }, [product])

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: value }))
// //   }

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       const file = e.target.files[0]
// //       setFormData((prev) => ({ ...prev, image: file }))
// //       setPreviewUrl(URL.createObjectURL(file))
// //     }
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       let imageObj = product?.image ? { id: product.image.id, url: product.image.url } : null

// //       if (formData.image) {
// //         if (imageObj) {
// //           await deleteImage(Number(imageObj.id))
// //         }

// //         const uploadedImage = await uploadImage(formData.image)
// //         if (!uploadedImage) {
// //           throw new Error(uploadError || "Failed to upload image.")
// //         }
// //         imageObj = uploadedImage
// //       }

// //       const productData = {
// //         name: formData.name,
// //         price: Number(formData.price),
// //         stock: Number(formData.stock),
// //         category: {name : formData.category },
// //         image: imageObj ? [{ id: imageObj.id, url: imageObj.url }] : undefined,
// //       }

// //       if (isEditing) {
// //         await editProduct(product.documentId, productData)
// //       } else {
// //         await addProduct(productData)
// //       }

// //       window.location.reload()
// //       onClose()
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to save product.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //       <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
// //         >
// //           <X size={24} />
// //         </button>
// //         <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? "Edit Product" : "Add Product"}</h2>
// //         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           <div>
// //             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
// //               Product Name
// //             </label>
// //             <input
// //               id="name"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //               placeholder="Enter product name"
// //               required
// //             />
// //           </div>
// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Price
// //               </label>
// //               <input
// //                 id="price"
// //                 type="number"
// //                 name="price"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter price"
// //                 required
// //               />
// //             </div>
// //             <div>
// //               <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Stock
// //               </label>
// //               <input
// //                 id="stock"
// //                 type="number"
// //                 name="stock"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //                 className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //                 placeholder="Enter stock"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
// //               Category
// //             </label>
// //             <select
// //               id="category"
// //               name="category"
// //               value={formData.category}
// //               onChange={handleChange}
// //               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //               required
// //             >
// //               <option value="">Select Category</option>
// //               {categories.map((cat) => (
// //                 <option key={cat.id} value={cat.id}>
// //                   {cat.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
// //               Product Image
// //             </label>
// //             <div
// //               className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors"
// //               onClick={() => fileInputRef.current?.click()}
// //             >
// //               <div className="space-y-1 text-center">
// //                 {previewUrl ? (
// //                   <div className="flex justify-center">
// //                     <Image
// //                       src={previewUrl || "/placeholder.svg"}
// //                       alt="Preview"
// //                       width={100}
// //                       height={100}
// //                       className="object-cover rounded-md"
// //                     />
// //                   </div>
// //                 ) : (
// //                   <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
// //                 )}
// //                 <div className="flex text-sm text-gray-600 text-center">
// //                   <label
// //                     htmlFor="image"
// //                     className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
// //                   >
// //                     <span className="pl-5"  >{previewUrl ? "Change image" : "Upload an image"}</span>
// //                     <input
// //                       ref={fileInputRef}
// //                       id="image"
// //                       name="image"
// //                       type="file"
// //                       className="sr-only"
// //                       onChange={handleFileChange}
// //                       accept="image/*"
// //                     />
// //                   </label>
// //                 </div>
// //                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
// //               </div>
// //             </div>
// //           </div>
// //           <div className="flex justify-end space-x-4 mt-8">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
// //               disabled={loading}
// //             >
// //               {loading ? "Saving..." : "Save"}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProductForm



// "use client"

// import React, { useState, useEffect, useRef } from "react"
// import { useProductContext } from "@/lib/context/product-context"
// import { useCategoryContext } from "@/lib/context/category-context"
// // import { useImageUpload } from "@/hooks/useImageUpload"
// import { useImageUpload } from "../../hooks/useimageupload"
// import { STRAPI_URL } from "@/config/constant"
// import Image from "next/image"
// import { X, ImageIcon, Trash } from "lucide-react"

// interface FormData {
//   name: string
//   price: number
//   stock: number
//   category: string
//   images: File[]
// }

// interface ProductFormProps {
//   product?: any
//   onClose: () => void
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
//   const { addProduct, editProduct } = useProductContext()
//   const { categories } = useCategoryContext()
//   const { uploadImages, deleteImage, uploadError } = useImageUpload()
//   const isEditing = !!product

//   const [formData, setFormData] = useState<FormData>({
//     name: product?.name || "",
//     price: product?.price || 0,
//     stock: product?.stock || 0,
//     category: product?.category?.id || "",
//     images: [],
//   })

//   const [existingImages, setExistingImages] = useState<{ id: number; url: string }[]>(product?.image || [])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   useEffect(() => {
//     if (product?.image) {
//       setExistingImages(product.image)
//     }
//   }, [product])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files)
//       setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
//     }
//   }

//   const handleRemoveImage = async (imageId: number) => {
//     await deleteImage(imageId)
//     setExistingImages((prev) => prev.filter((img) => img.id !== imageId))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError(null)

//     try {
//       let uploadedImages = [...existingImages]

//       if (formData.images.length > 0) {
//         const newUploadedImages = await uploadImages(formData.images)
//         if (!newUploadedImages) {
//           throw new Error(uploadError || "Failed to upload images.")
//         }
//         uploadedImages = [...uploadedImages, ...newUploadedImages]
//       }

//       const productData = {
//         name: formData.name,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         category: { id: formData.category },
//         image: uploadedImages.length > 0 ? uploadedImages : undefined,
//       }

//       if (isEditing) {
//         await editProduct(product.documentId, productData)
//       } else {
//         await addProduct(productData)
//       }

//       window.location.reload()
//       onClose()
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save product.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-8 rounded-lg w-full max-w-md relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
//           <X size={24} />
//         </button>
//         <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? "Edit Product" : "Add Product"}</h2>
//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Product Name
//             </label>
//             <input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
//               <input
//                 id="price"
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//               <input
//                 id="stock"
//                 type="number"
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md" required>
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>{cat.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
//             <input ref={fileInputRef} type="file" multiple onChange={handleFileChange} accept="image/*" />
//             <div className="flex flex-wrap gap-2 mt-2">
//               {existingImages.map((img) => (
//                 <div key={img.id} className="relative">
//                   <Image src={`${STRAPI_URL}${img.url}`} alt="Product" width={80} height={80} className="rounded-md object-cover" />
//                   <button onClick={() => handleRemoveImage(img.id)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1">
//                     <Trash size={16} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end space-x-4 mt-8">
//             <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default ProductForm




// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { useProductContext } from "@/lib/context/product-context"
// // import { STRAPI_URL } from "@/config/constant"
// // import { useImageUpload } from "@/hooks/useimageupload"
// // import Image from 'next/image';
// // import { Category } from "@/types/category"
// // import { useCategoryContext } from "@/lib/context/category-context"


// // interface FormData {
// //   name: string
// //   price: number
// //   stock: number
// //   category: string
// //   image: File | null
// // }

// // interface ProductFormProps {
// //   product?: any
// //   onClose: () => void
// // }

// // const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
// //   const { products,  addProduct, editProduct } = useProductContext()
// //   const {categories} = useCategoryContext();
// //   const { uploadImage, deleteImage, uploadError } = useImageUpload()
// //   const isEditing = !!product

// //   const [formData, setFormData] = useState<FormData>({
// //     name: product?.name || "",
// //     price: product?.price || 0,
// //     stock: product?.stock || 0,
// //     category: product?.category?.id || "",
// //     image: null,
// //   })
 
// //   // const [categories, setCategories] = useState<Category[]>([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState<string | null>(null)

  

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target
// //     setFormData((prev) => ({ ...prev, [name]: value }))
// //   }

// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files) {
// //       setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
// //     }
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setLoading(true)
// //     setError(null)

// //     try {
// //       // let imageObj =  { id: product.image.id, url: product.image.url } 
// //       let imageObj = product?.image ? { id: product.image.id, url: product.image.url } : null;

// //       // let imageObj =  { id: product.image.id, url: product.image.url } ;

// //       if (formData.image) {
// //         if (imageObj) {
// //           await deleteImage(Number(imageObj.id))
// //         }

// //         const uploadedImage = await uploadImage(formData.image)
// //         if (!uploadedImage) {
// //           throw new Error(uploadError || "Failed to upload image.")
// //         }
// //         imageObj = uploadedImage
// //       }

// //       const productData = {
// //         name: formData.name,
// //         price: Number(formData.price),
// //         stock: Number(formData.stock),
// //         category: {name : formData.category},
// //         image: imageObj,
// //       }

// //       if (isEditing) {
// //         await editProduct(product.documentId, productData)
// //       } else {
// //         await addProduct(productData)
// //       }
// //       onClose()
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to save product.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //       <div className="bg-white p-6 rounded-md w-96">
// //         <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h2>
// //         {error && <p className="text-red-500 mb-2">{error}</p>}
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             className="w-full mb-2 p-2 border"
// //             placeholder="Product Name"
// //             required
// //           />
// //           <input
// //             type="number"
// //             name="price"
// //             value={formData.price}
// //             onChange={handleChange}
// //             className="w-full mb-2 p-2 border"
// //             placeholder="Price"
// //             required
// //           />
// //           <input
// //             type="number"
// //             name="stock"
// //             value={formData.stock}
// //             onChange={handleChange}
// //             className="w-full mb-2 p-2 border"
// //             placeholder="Stock"
// //             required
// //           />

// //           <select name="category" value={formData.category} onChange={handleChange} className="w-full mb-2 p-2 border">
// //             <option value="">Select Category</option>
// //             {categories.map((cat) => (
// //               <option key={cat.id} value={cat.id}>
// //                 {cat.name}
// //               </option>
// //             ))}
// //           </select>

// //           <input type="file" onChange={handleFileChange} className="w-full mb-2 p-2 border" />

// //           {product?.image?.[0]?.url && (
// //             <div className="mb-2">
// //               <p className="text-gray-500 text-sm">Current Image:</p>
// //               <Image
// //                 src={`${STRAPI_URL}${product.image[0].url}`}
// //                 alt="Product"
// //                 className="w-20 h-20 object-cover rounded mt-1"
// //                 fill
// //               />
// //             </div>
// //           )}

// //           <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
// //             {loading ? "Saving..." : "Save"}
// //           </button>
// //         </form>
// //         <button onClick={onClose} className="mt-2 p-2 w-full bg-gray-500 text-white rounded">
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProductForm


// "use client";

// import type React from "react";
// import { useState } from "react";
// import { useProductContext } from "@/lib/context/product-context";
// import { STRAPI_URL } from "@/config/constant";
// import { useImageUpload } from "@/hooks/useimageupload";
// import Image from "next/image";
// import { useCategoryContext } from "@/lib/context/category-context";

// interface FormData {
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
//   image: File | null;
// }

// interface ProductFormProps {
//   product?: any;
//   onClose: () => void;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
//   const { addProduct, editProduct } = useProductContext();
//   const { categories } = useCategoryContext();
//   const { uploadImage, deleteImage, uploadError } = useImageUpload();
//   const isEditing = !!product;

//   const [formData, setFormData] = useState<FormData>({
//     name: product?.name || "",
//     price: product?.price || 0,
//     stock: product?.stock || 0,
//     category: product?.category?.id  , // ✅ Ensure it stores the category ID
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       let imageObj = product?.image ? { id: product.image.id, url: product.image.url } : null;

//       if (formData.image) {
//         if (imageObj) {
//           await deleteImage(Number(imageObj.id));
//         }

//         const uploadedImage = await uploadImage(formData.image);
//         if (!uploadedImage) {
//           throw new Error(uploadError || "Failed to upload image.");
//         }
//         imageObj = uploadedImage;
//       }

//       const productData = {
//         name: formData.name,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         category: { id: formData.category }, // ✅ FIXED: Use category ID instead of name
//         image: imageObj,
//       };

//       if (isEditing) {
//         await editProduct(product.documentId, productData);
//       } else {
//         await addProduct(productData);
//       }
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96">
//         <h2 className="text-lg font-semibold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h2>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border"
//             placeholder="Product Name"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border"
//             placeholder="Price"
//             required
//           />
//           <input
//             type="number"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border"
//             placeholder="Stock"
//             required
//           />

//           <select name="category" value={formData.category} onChange={handleChange} className="w-full mb-2 p-2 border" required>
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <input type="file" onChange={handleFileChange} className="w-full mb-2 p-2 border" />

//           {product?.image?.[0]?.url && (
//             <div className="mb-2">
//               <p className="text-gray-500 text-sm">Current Image:</p>
//               <Image
//                 src={`${STRAPI_URL}${product.image[0].url}`}
//                 alt="Product"
//                 className="w-20 h-20 object-cover rounded mt-1"
//                 fill
//               />
//             </div>
//           )}

//           <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </form>
//         <button onClick={onClose} className="mt-2 p-2 w-full bg-gray-500 text-white rounded">
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


// "use client";

// import type React from "react";
// import { useState } from "react";
// import { useProductContext } from "@/lib/context/product-context";
// import { STRAPI_URL } from "@/config/constant";
// import { useImageUpload } from "@/hooks/useimageupload";
// import Image from "next/image";
// import { useCategoryContext } from "@/lib/context/category-context";
// import { X, ImageIcon } from "lucide-react";

// interface FormData {
//   name: string;
//   price: number;
//   stock: number;
//   category: string;
//   image: File | null;
// }

// interface ProductFormProps {
//   product?: any;
//   onClose: () => void;
// }

// const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
//   const { addProduct, editProduct } = useProductContext();
//   const { categories } = useCategoryContext();
//   const { uploadImage, deleteImage, uploadError } = useImageUpload();
//   const isEditing = !!product;

//   const [formData, setFormData] = useState<FormData>({
//     name: product?.name || "",
//     price: product?.price || 0,
//     stock: product?.stock || 0,
//     category: product?.category?.id || "", // ✅ Ensured category has a default value
//     image: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       let imageObj = product?.image ? { id: product.image.id, url: product.image.url } : null;

//       if (formData.image) {
//         if (imageObj) {
//           await deleteImage(Number(imageObj.id));
//         }

//         const uploadedImage = await uploadImage(formData.image);
//         if (!uploadedImage) {
//           throw new Error(uploadError || "Failed to upload image.");
//         }
//         imageObj = uploadedImage;
//       }

//       const productData = {
//         name: formData.name,
//         price: Number(formData.price),
//         stock: Number(formData.stock),
//         category: { id: formData.category }, // ✅ Corrected to use category ID
//         image: imageObj ? [{ id: imageObj.id, url: imageObj.url }] : undefined,
//       };

//       if (isEditing) {
//         await editProduct(product.documentId, productData);
//       } else {
//         await addProduct(productData);
//       }
//       onClose();
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to save product.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md w-96 relative">
//         {/* Close Button */}
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
//           <X size={24} />
//         </button>

//         <h2 className="text-lg font-semibold mb-4 text-center">
//           {isEditing ? "Edit Product" : "Add Product"}
//         </h2>

//         {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border rounded-md"
//             placeholder="Product Name"
//             required
//           />

//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border rounded-md"
//             placeholder="Price"
//             required
//           />

//           <input
//             type="number"
//             name="stock"
//             value={formData.stock}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border rounded-md"
//             placeholder="Stock"
//             required
//           />

//           {/* Category Selection */}
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full mb-2 p-2 border rounded-md"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {/* Image Upload */}
//           <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400 transition-colors">
//             <div className="space-y-1 text-center">
//               {formData.image ? (
//                 <Image
//                   src={URL.createObjectURL(formData.image)}
//                   alt="Preview"
//                   width={100}
//                   height={100}
//                   className="object-cover rounded-md"
//                 />
//               ) : (
//                 <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//               )}
//               <div className="flex text-sm text-gray-600 text-center">
//                 <label
//                   htmlFor="image"
//                   className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
//                 >
//                   <span>{formData.image ? "Change image" : "Upload an image"}</span>
//                   <input
//                     id="image"
//                     name="image"
//                     type="file"
//                     className="sr-only"
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//               <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
//             </div>
//           </div>

//           {/* Display existing image if editing */}
//           {isEditing && product?.image?.[0]?.url && (
//             <div className="mb-2 flex justify-center">
//               <p className="text-gray-500 text-sm">Current Image:</p>
//               <Image
//                 src={`${STRAPI_URL}${product.image[0].url}`}
//                 alt="Product"
//                 width={80}
//                 height={80}
//                 className="object-cover rounded-md mt-1"
//               />
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex justify-end space-x-4 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
