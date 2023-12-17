import { KYCSetup, Text } from 'components'
import { useAuth } from '../../contexts'
import viteLogo from '/vite.svg?url'
import { Button } from 'components'
import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import Logo from '../../assets/react.svg?react'
import UpcomingActivities from 'components/compounds/UpcomingActivities/UpcomingActivities'

const HomePage = () => {
  const [count, setCount] = useState(0)

  const v = useAuth()
  const { firstName, lastName } = v

  console.log(v)

  return (
    <>
      <KYCSetup />
      <Text content={`Welcome back ${firstName} ${lastName},`.trim()} />
      <Text>Date</Text>
      <div>content goes here</div>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          text={`count is ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <Button
          kind={'rounded'}
          text={`count is ${count}`}
          onClick={() => setCount((count) => count + 1)}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Logo width={70} height={70} />
      <Text
        className="read-the-docs"
        content={'Click on the Vite and React logos to learn more'}
      />
      <Text
        level={6}
        className="read-the-docs"
        content={'Click on the Vite and React logos to learn more'}
      />
      <UpcomingActivities />
    </>
  )
}

export default HomePage
