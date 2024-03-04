import { useQuery } from 'react-query'
import request from '../../../api'

interface RecordI {
  id: string
  balance: number
}
interface WalletI {
  id: string
  balance: number
  records?: RecordI[]
}
interface WalletDataI {
  [key: string]: WalletI
}

interface DataI {
  data: WalletDataI
}

export const useQueryWallets = () => {
  return useQuery({
    queryKey: ['allWallets'],
    queryFn: async () => {
      const response = await request.get<DataI>('/users/wallets')
      return response.data
    },
  })
}
