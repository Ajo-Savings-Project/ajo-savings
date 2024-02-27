import { useQuery } from 'react-query'
import request from '../../../api'

export const useQueryWallets = () => {
  return useQuery({
    queryKey: ['allWallets'],
    queryFn: async () => request.get('/users/wallets'),
  })
}
