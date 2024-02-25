import { Response, Request } from 'express'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../constants'
import { RequestExt } from '../../middleware/authorization/authentication'
import Groups from '../../models/groups'
import Users from '../../models/users'
import { withPaginate } from '../../utils/hocs/withPaginate'

//TODO - document api, it was only created for testing
export const getGroups = async (req: Request, res: Response) => {
  const result = await withPaginate(Groups, { ...req.query })({
    include: [{ model: Users, as: 'user' }],
  })

  return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, result)
}

export const getGroup = async (req: RequestExt, res: Response) => {
  const { _userId } = req.body

  const result = await withPaginate(Groups, { ...req.query })({
    where: { ownerId: _userId },
    include: [{ model: Users }],
  })

  return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, result)
}
