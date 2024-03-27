import { useQuery } from 'react-query'
import request from '../../../api'
import { z } from 'zod'

type RecordI = {
  id: string
  balance: number
}
type WalletI = {
  balance: number
  records?: RecordI[]
}
type D = {
  [key: string]: WalletI
}

export type ResponseType = {
  GLOBAL: RecordI
  SAVINGS: RecordI
  GROUPS: D
}
export const walletSchema = z.object({
  GLOBAL: z.object({
    id: z.string(),
    balance: z.number(),
  }),
  SAVINGS: z.object({
    id: z.string(),
    balance: z.number(),
  }),

  GROUPS: z.object({
    balance: z.number(),
    records: z.array(
      z.object({
        id: z.string(),
        balance: z.number(),
      })
    ),
  }),
})

export const useQueryWallets = () => {
  return useQuery({
    queryKey: ['allWallets'],
    queryFn: async () => {
      const response = await request.get<ResponseType>('/users/wallets')
      const result = walletSchema.safeParse(response.data)
      if (result.success) return result
    },
  })
}
