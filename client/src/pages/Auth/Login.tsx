import { Button } from 'components'
import { useAuth } from 'contexts'

const LoginPage = () => {
  const { handleAuthSession } = useAuth()

  return (
    <div>
      Login page
      <Button
        text={'login'}
        onClick={() => handleAuthSession({ token: 'x', refreshToken: 'r' })}
      />
    </div>
  )
}

export default LoginPage
