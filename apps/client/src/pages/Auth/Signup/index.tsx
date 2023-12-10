import { Link } from 'react-router-dom'
import { Button } from 'components'
import { routes } from 'router'

const SignupPage = () => {
  return (
    <div>
      sign up page
      <Button text={'signup'} />
      <Link to={routes.auth.login.abs_path}>Login</Link>
    </div>
  )
}

export default SignupPage
