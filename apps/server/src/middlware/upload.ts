import ENV from '../config/env'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// const storage = multer.memoryStorage()
interface MyParams {
  folder: string
  allowedFormats?: string[]
  transformation?: { width: number; height: number; crop: string }[]
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.API_KEY_4_CLOUDINARY,
  api_secret: ENV.API_SECRET_4_CLOUDINARY,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'AJO-Uploads',
    allowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  } as MyParams,
})

export const upload = multer({ storage: storage })
