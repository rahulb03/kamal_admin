import { useState } from "react"
import axios from "axios"
import { STRAPI_URL } from "@/config/constant"

interface ImageData {
  id: string
  url: string
}

export const useImageUpload = () => {
  const [uploadError, setUploadError] = useState<string | null>(null)

  const uploadImage = async (file: File): Promise<ImageData | null> => {
    const formData = new FormData()
    formData.append("files", file)

    try {
      const response = await axios.post(`${STRAPI_URL}/api/upload`, formData)
      const uploadedImage = response.data[0]
      return { id: String(uploadedImage.id), url: String(uploadedImage.url) }
    } catch (err) {
      setUploadError("Image upload failed.")
      return null
    }
  }

  const deleteImage = async (imageId: number): Promise<void> => {
    try {
      await axios.delete(`${STRAPI_URL}/api/upload/files/${imageId}`)
    } catch (err) {
      console.error("Failed to delete image", err)
    }
  }

  return { uploadImage, deleteImage, uploadError }
}

