import { AccountSummarySection, KYCSetup, Text } from 'components'
import { useAuth } from '../../contexts'
import UpcomingActivities from '../../components/compounds/UpcomingActivities/UpcomingActivities'

import ChartWithUpcoming from './chartAndUpcoming'

import TransactionHistory from "../../components/compounds/UpcomingActivities/UpcomingActivities"
const HomePage = () => {
  const { firstName, lastName } = useAuth()

  return (
    <>
      <KYCSetup />
      <Text content={`Welcome back ${firstName} ${lastName},`.trim()} />
      <Text>Date</Text>
      <div>content goes here</div>
      <AccountSummarySection />
      <UpcomingActivities />
      <ChartWithUpcoming />
      <TransactionHistory />
    </>
  )
}

export default HomePage
