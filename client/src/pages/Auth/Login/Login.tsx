import { Button, Text } from 'components'
import { useAuth } from 'contexts'
import styles from './login.module.scss'
import { Input } from '../../../components/elements'
import classNames from 'classnames'
import GoogleIcon from './GoogleGoogleIcon.svg?react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  const { handleAuthSession } = useAuth()

  return (
    <div className={styles.loginDiv}>
      <div className={styles.ajo}>
        <Text
          content={'Ajó Savings'}
          className={classNames('app-logo')}
          style={{
            color: 'var(--primary-600)',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
        <Text
          content={'Welcome back to Ajó Savings.'}
          className={styles.welcome}
        />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginInput}>
          <GoogleIcon className={styles.google} />
          <div className={styles.placeholderDiv}>
            <Input
              className={styles.input}
              label={''}
              placeholder=" Sign in with Google"
            />
          </div>
        </div>

        <div className={styles.or}>
          <span className={styles.line1}></span>{' '}
          <span className={styles.line2}>OR</span>{' '}
          <span className={styles.line1}></span>
        </div>

        <form className={styles.loginForm}>
          <Input
            className={styles.emailInput}
            type={'email'}
            label={'Email Address'}
            placeholder="Enter your email"
          />

          <div className={styles.passwordDiv}>
            <Input
              className={styles.passwordInput}
              label={'Password'}
              type={'password'}
              placeholder={'*********'}
            />
          </div>

          <div className={styles.password}>
            <Link to="" className={styles.passwordLink}>
              Forgot password
            </Link>
          </div>
        </form>

        <Button
          text={'login'}
          onClick={() => handleAuthSession({ token: 'x', refreshToken: 'r' })}
        />
        <div className={styles.signUp}>
          <p className={styles.noAccount}>
            Don’t have an account ?
            <span>
              <Link to="" className={styles.signupLink}>
                Sign Up here
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
