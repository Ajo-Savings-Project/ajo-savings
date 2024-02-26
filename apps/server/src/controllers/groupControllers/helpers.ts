import { v4 } from 'uuid'

interface Props {
  userId: string
  groupId: string
}
export const createNewMember = (props: Props) => {
  return {
    id: v4(),
    groupId: props.groupId,
    userId: props.userId,
    amountContributed: 0,
    totalAmountWithdrawnByUser: 0,
    dateOfLastContribution: null,
  }
}
