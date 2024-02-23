import GroupMembers from '../../models/groupMembers'
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
  const member = await GroupMembers.findOne({
    where: { userId: props.userId },
  })
  const user = await getUserWithId(props.userId)
  if (user) {
    let sequence = member?.sequence || 0
    const MAX_SEQUENCE_VALUE = 40991

    if (props.options?.isAdmin) {
      sequence = MAX_SEQUENCE_VALUE
    }
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
      sequence: sequence,
    }
  }
  return null
}
