import { useLocation } from 'react-router-dom'
import ActiveSavings from './activeSavings.tsx'
import ExploreGroups from './exploreGroups.tsx'

const GroupsPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const currentPage = params.get('page')
  console.log({ currentPage })

  if (currentPage === 'explore') {
    return <ExploreGroups />
  }
  return <ActiveSavings />
}

export default GroupsPage
