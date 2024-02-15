import { Response } from 'express'
import { RequestExt } from 'middleware/authorization/authentication'
import { editProfileSchema } from '../../utils/validators'
import { HTTP_STATUS_CODE } from '../../constants'
import { v2 as cloudinary } from 'cloudinary'

export const updateKycProfile = async (req: RequestExt, res: Response) => {
  try {
    const { _user: user, ...rest } = req.body

    const validationResult = editProfileSchema.safeParse(rest)

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: 'Validation error',
        issues: validationResult.error.issues,
      })
    }

    const _newData = { ...user, ...validationResult.data }

    if (validationResult.data.date_of_birth) {
      _newData.date_of_birth = new Date(
        validationResult.data.date_of_birth
      ).toISOString()
    }

    // upload files to Cloudinary if available.
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[]
    }
    const identificationDocPath = files?.['identification_doc']?.[0]?.path
    const proofOfAddressDocPath = files?.['proof_of_address_doc']?.[0]?.path

    if (identificationDocPath) {
      const identificationDocResult = await cloudinary.uploader.upload(
        files['identification_doc'][0].buffer.toString('base64')
      )
      _newData.identification_doc = identificationDocResult.secure_url
    }

    if (proofOfAddressDocPath) {
      const proofOfAddressDocResult = await cloudinary.uploader.upload(
        files['proof_of_address_doc'][0].buffer.toString('base64')
      )
      _newData.proof_of_address_doc = proofOfAddressDocResult.secure_url
    }

    await user.save()

    const modifiedUserData = Object.keys(validationResult.data).reduce(
      (acc: Record<string, unknown>, cur) => {
        acc[cur] = _newData[cur as keyof typeof _newData]
        return acc
      },
      {}
    )

    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Profile updated successfully',
      user: modifiedUserData,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `Something went wrong, our team has been notified`,
    })
  }
}
