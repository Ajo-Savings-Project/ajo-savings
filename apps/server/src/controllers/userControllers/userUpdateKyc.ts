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

    const {
      gender,
      occupation,
      date_of_birth,
      bvn,
      address,
      identification_type,
      identification_number,
      identification_doc,
      proof_of_address_doc,
    } = validationResult.data

    const _gender = gender ?? user.gender
    const _occupation = occupation ?? user.occupation
    const _date_of_birth = date_of_birth ?? user.date_of_birth
    const _bvn = bvn ?? user.bvn
    const _address = address ?? user.address
    const _identification_type = identification_type ?? user.identification_type
    const _identification_number =
      identification_number ?? user.identification_number
    let _identification_doc = identification_doc ?? user.identification_doc
    let _proof_of_address_doc =
      proof_of_address_doc ?? user.proof_of_address_doc

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
      _identification_doc = identificationDocResult.secure_url
    }

    if (proofOfAddressDocPath) {
      const proofOfAddressDocResult = await cloudinary.uploader.upload(
        files['proof_of_address_doc'][0].buffer.toString('base64')
      )
      _proof_of_address_doc = proofOfAddressDocResult.secure_url
    }

    user.gender = _gender
    user.occupation = _occupation
    user.date_of_birth = new Date(_date_of_birth)
    user.bvn = _bvn
    user.address = _address
    user.identification_type = _identification_type
    user.identification_number = _identification_number
    user.identification_doc = _identification_doc
    user.proof_of_address_doc = _proof_of_address_doc

    await user.save()

    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Profile updated successfully',
      user,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `Something went wrong, our team has been notified`,
    })
  }
}
