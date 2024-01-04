import { useQuery } from 'react-query'
import request from 'api'

export const useGetUpcomingActivitiesQuery = () => {
  return useQuery({
    queryKey: [useGetUpcomingActivitiesQuery.name],
    queryFn: async () => request.get('/users/upcomingActivities'),
  })
}
