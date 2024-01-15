import {
  AccountSummarySection,
  KYCSetup,
  MyGoals,
  Text,
  TransactionHistory,
  UpcomingActivities,
} from 'components'
import { useAuth } from '../../contexts'

import ChartWithUpcoming from './chartAndUpcoming'

const HomePage = () => {
  const { firstName, lastName } = useAuth()

  return (
    <>
      <KYCSetup />
      <Text content={`Welcome back ${firstName} ${lastName},`.trim()} />
      <Text>Date</Text>
      <div>content goes here</div>
      <AccountSummarySection />
      <MyGoals />
      <UpcomingActivities />
      <ChartWithUpcoming />
      <TransactionHistory />
    </>
  )
}

export default HomePage
