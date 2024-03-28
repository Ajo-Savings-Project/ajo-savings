import request from 'api'
import { useMutation } from 'react-query'
import { z } from 'zod'

export const CreateGroupSchema = z.object({
  groupName: z.string().min(1, 'Group name is required'),
  recurringAmount: z.string().min(1, 'Contribution amount is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  maxNumberOfParticipants: z
    .string()
    .min(1, 'Number of participant is required'),
  purposeAndGoals: z.string().min(1, 'Purpose and goal is required'),
})

export const CreateGroupResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    groupName: z.string(),
    purposeAndGoals: z.string(),
    recurringAmount: z.string(),
    frequency: z.string(),
    maxNumberOfParticipants: z.string(),
  }),
})

export const useCreateGroupMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof CreateGroupSchema>) => {
      const res = await request.post('/groups/createGroup', {
        ...data,
        // Todo: Backend has not removed dration from the request body
        recurringAmount: Number(data.recurringAmount),
        maxNumberOfParticipants: Number(data.maxNumberOfParticipants),

        duration: '',
      })
      const result = CreateGroupResponseSchema.safeParse(res.data)
      if (result.success) return result
    },
  })
}
