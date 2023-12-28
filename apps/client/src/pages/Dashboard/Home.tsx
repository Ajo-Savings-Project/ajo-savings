import { AccountSummarySection, KYCSetup, Text } from 'components'
import { useAuth } from '../../contexts'
import UpcomingActivities from 'components/compounds/UpcomingActivities/UpcomingActivities'

import ChartWithUpcoming from './chartAndUpcoming'
import MyGoals from '../../components/compounds/goal/MyGoals'

import Wallet from 'pages/Dashboard/Wallets/Wallet'
const HomePage = () => {
  const { firstName, lastName } = useAuth()

  return (
    <>
      <KYCSetup />
      <Text content={`Welcome back ${firstName} ${lastName},`.trim()} />
      <Text>Date</Text>
      <div>content goes here</div>
      <AccountSummarySection />
      <Wallet />
      <UpcomingActivities />
      <ChartWithUpcoming />
      <MyGoals />
    </>
  )
}

export default HomePage
