import Users from '../../models/users'
import { v4 } from 'uuid'

export const getUserWithId = async (userId: string) => {
  return await Users.findOne({
    where: { id: userId },
  })
}

interface Props {
  userId: string
  adminId: string
  options?: Partial<{
    isAdmin: boolean
  }>
}
export const createNewMember = async (props: Props) => {
  const user = await getUserWithId(props.userId)
  if (user) {
    return {
      id: v4(),
      adminId: props.adminId,
      userId: props.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      amountContributed: 0,
      totalAmountWithdrawnByUser: 0,
      dateOfLastContribution: null,
      isAdmin: props?.options?.isAdmin || false,
    }
  }
  return null
}
