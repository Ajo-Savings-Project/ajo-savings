import Users from '../../models/users'

export const getUserWithId = async (userId: string) => {
  return await Users.findOne({
    where: { id: userId },
  })
}

interface Props {
  isAdmin: boolean
}
export const createNewMember = async (
  userId: string,
  adminId: string,
  props?: Props
) => {
  const user = await getUserWithId(userId)
  if (user) {
    return {
      adminId,
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePic: user.profilePic,
      amountContributed: 0,
      totalAmountWithdrawnByUser: 0,
      dateOfLastContribution: null,
      isAdmin: props?.isAdmin || false,
    }
  }
  return null
}
