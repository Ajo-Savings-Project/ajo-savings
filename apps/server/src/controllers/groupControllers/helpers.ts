import _ from 'lodash'
import Users from '../../models/users'

export const getUserWithId = async (userId: string) => {
  return await Users.findOne({
    where: { id: userId },
  })
}

interface Props {
  isAdmin: boolean
}
export const createNewMember = async (userId: string, props?: Props) => {
  const user = await getUserWithId(userId)
  if (user) {
    return {
      user: _.pick(user.dataValues, [
        'id',
        'firstName',
        'lastName',
        'profilePic',
      ]) as Pick<Users, 'id' | 'firstName' | 'lastName' | 'profilePic'>,
      amountContributed: 0,
      amountWithdrawn: 0,
      dateOfLastContribution: null,
      isAdmin: props?.isAdmin || false,
    }
  }
  return null
}
