import { Response } from 'express'
import _ from 'lodash'
import { RequestExt } from '../../middleware/authorization/authentication'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'

export const userProfileDetails = async (req: RequestExt, res: Response) => {
  try {
    const { _user: user } = req.body

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      data: _.omit(user.dataValues, [
        'password',
        'authMethod',
        'createdAt',
        'updatedAt',
      ]),
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, error)
  }
}
