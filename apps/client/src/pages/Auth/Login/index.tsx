import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import {
  appNotify,
  Button,
  Input,
  ReactHookFormErrorRender,
  Text,
} from 'components'
import { useAuth } from 'contexts'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { routes } from 'router'
import { HEADER_TITLE } from 'appConstants'
import { jwtDecode } from 'utils/jwtDecode.ts'
import styles from './login.module.scss'
import {
  useLoginMutation,
  LoginSchema,
  LoginResponseSchema,
} from './requests.ts'
import GoogleIcon from './GoogleGoogleIcon.svg?react'
import request from 'api/index.ts'

type LoginSchemaType = z.infer<typeof LoginSchema>

const LoginPage = () => {
  const { state, search, pathname } = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: state?.email || '',
    },
  })

  const { handleAuthSession } = useAuth()

  const apiLogin = useLoginMutation()

  const handleLogin = async (values: LoginSchemaType) => {
    const res = await apiLogin.mutateAsync(values)
    if (res) handleAuthSession(res.data)
  }

  const [oauthLoading, setOauthLoading] = useState(false)

  async function auth() {
    try {
      setOauthLoading(true)
      const response = await request.post<{ url: string }>('/oauth/request')
      window.location.href = response.data.url
    } catch (e) {
      setOauthLoading(false)
    }
  }

  useEffect(() => {
    if (search) {
      try {
        const params = new URLSearchParams(search)
        const type = params.get('type')
        const token = params.get('oauth_token')
        if (type === 'success') {
          const res = jwtDecode<z.infer<typeof LoginResponseSchema>>(
            token as string
          )
          setTimeout(() => {
            handleAuthSession(res.data)
          }, 1000)
        } else {
          /**
           * TODO: do more research on the cause of this
           * i suspect due to react double re-rendering, appNotify is cancelled after first render.
           */
          setTimeout(
            () =>
              appNotify('error', 'Something went wrong', undefined, {
                id: 'failed-oauth',
              }),
            1000
          )
        }
      } finally {
        setOauthLoading(false)
        window.history.pushState(null, '', pathname)
      }
    }
  }, [handleAuthSession, pathname, search])

  return (
    <div className={styles.loginDiv}>
      <div className={styles.loginDivAjo}>
        <Text
          content={HEADER_TITLE}
          className={classNames('app-logo')}
          color={'Primary'}
          font={'Bodoni'}
        />
        <Text
          content={
            state?.firstName
              ? `Welcome ${state.firstName}. Login to continue.`
              : 'Welcome back to Ajó Savings.'
          }
        />
      </div>
      <div className={styles.loginDivFormContainer}>
        <Button
          className={styles.googleButton}
          onClick={auth}
          disabled={oauthLoading}
        >
          {oauthLoading && '>>>> '}
          <GoogleIcon />
          Sign in with Google
        </Button>
        <div className={styles.divider}>
          <Text content={'OR'} color={'Gray'} size={'Small'} />
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            className={styles.emailInput}
            type={'email'}
            label={'Email Address'}
            placeholder="Enter your email"
            {...register('email')}
          />
          <Input
            className={styles.passwordInput}
            label={'Password'}
            type={'password'}
            placeholder={'Enter your password'}
            {...register('password')}
          />
          <Link to={routes.auth['reset-password'].abs_path}>
            Forgot password
          </Link>
          <Button disabled={apiLogin.isLoading} text={'login'} type="submit" />
        </form>
        <ReactHookFormErrorRender errors={errors} />
        <Text
          color={'Gray'}
          size={'Small'}
          className={styles.loginDivFormContainerHaveAccount}
        >
          Don’t have an account?&nbsp;&nbsp;
          <Link to={routes.auth.signup.abs_path}>Sign Up here</Link>
        </Text>
      </div>
    </div>
  )
}

export default LoginPage
