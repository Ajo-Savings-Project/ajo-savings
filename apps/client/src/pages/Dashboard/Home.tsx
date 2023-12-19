import { KYCSetup, Text } from 'components'
import { useAuth } from '../../contexts'
import MyGoals from './Goal'

const HomePage = () => {
  const v = useAuth()
  const { firstName, lastName } = v

  console.log(v)

  return (
    <>
      <KYCSetup />
      <Text content={`Welcome back ${firstName} ${lastName},`.trim()} />
      <Text>Date</Text>
      <div>content goes here</div>
      <MyGoals />
    </>
  )
}

export default HomePage
