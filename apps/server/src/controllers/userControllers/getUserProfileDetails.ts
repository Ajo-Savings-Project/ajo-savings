import { Response } from 'express'
import { RequestExt } from '../../middleware/authorization/authentication'
import { HTTP_STATUS_CODE } from '../../constants'

export const userProfileDetails = async (req: RequestExt, res: Response) => {
  try {
    const { _user: user } = req.body
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      occupation: user.occupation,
      date_of_birth: user.date_of_birth,
      bvn: user.bvn,
      address: user.address,
      identification_type: user.identification_type,
      identification_number: user.identification_number,
      identification_doc: user.identification_doc,
      proof_of_address_doc: user.proof_of_address_doc,
      isVerified: user.isVerified,
    }
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Fetched user profile details succesfully',
      user: userProfile,
    })
  } catch (error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: `Something went wrong, our team has been notified`,
    })
  }
}
