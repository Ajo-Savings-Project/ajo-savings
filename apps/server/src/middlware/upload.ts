import ENV from '../config/env'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// const storage = multer.memoryStorage()

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.API_KEY_4_CLOUDINARY,
  api_secret: ENV.API_SECRET_4_CLOUDINARY,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => {
    return {
      folder: 'AJO-Uploads',
    }
  },
})

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/webp'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(
        new Error('Only .png, .jpg, .webp and .jpeg formats are allowed!')
      )
    }
  },
})
