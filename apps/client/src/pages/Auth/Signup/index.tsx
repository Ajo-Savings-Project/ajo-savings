import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Text,
  Input,
  ReactHookFormErrorRender,
  appNotify,
} from 'components'
import { routes } from 'router'
import { useEffect, useState } from 'react'
import { HEADER_TITLE } from 'appConstants'
import classNames from 'classnames'
import GoogleIcon from '../Login/GoogleGoogleIcon.svg?react'
import styles from '../Login/login.module.scss'
import {
  RegisterSchema,
  RegisterResponseSchema,
  useRegisterMutation,
} from './request'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { jwtDecode } from '../../../utils/jwtDecode.ts'
import request from '../../../api/index.ts'
import { useAuth } from 'contexts'

type RegisterSchemaType = z.infer<typeof RegisterSchema>

const SignupPage = () => {
  const { search, pathname } = useLocation()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })

  const { handleAuthSession } = useAuth()

  const apiSignUp = useRegisterMutation()

  const handleRegister = async (values: RegisterSchemaType) => {
    const _newValue: Partial<RegisterSchemaType> = { ...values }
    delete _newValue['confirmPassword']
    const res = await apiSignUp.mutateAsync(_newValue as RegisterSchemaType)
    navigate(routes.auth.login.abs_path, { state: res!.user })
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
      const params = new URLSearchParams(search)
      const type = params.get('type')
      const token = params.get('oauth_token')
      window.history.pushState(null, '', pathname)
      if (type === 'success') {
        const res = jwtDecode<z.infer<typeof RegisterResponseSchema>>(
          token as string
        )
        setOauthLoading(false)
        setTimeout(() => {
          handleAuthSession(res.data)
        }, 1000)
      } else {
        appNotify('error', 'Something went wrong')
        setOauthLoading(false)
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
        <Text content={'Welcome back to Ajó Savings.'} />
      </div>
      <div className={styles.loginDivFormContainer}>
        <Button
          className={styles.googleButton}
          onClick={auth}
          disabled={oauthLoading}
        >
          {oauthLoading && '>>>> '}
          <GoogleIcon />
          Sign up with Google
        </Button>
        <div className={styles.divider}>
          <Text content={'OR'} color={'Gray'} size={'Small'} />
        </div>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Input
            className={styles.emailInput}
            type={'text'}
            label={'First Name'}
            placeholder="Enter your first name"
            {...register('firstName')}
          />
          <Input
            className={styles.emailInput}
            label={'Last Name'}
            type={'text'}
            placeholder={'Enter your last name'}
            {...register('lastName')}
          />

          <Input
            className={styles.emailInput}
            type={'email'}
            label={'Email Address'}
            placeholder="Enter your email"
            {...register('email')}
          />

          <Input
            className={styles.emailInput}
            type={'text'}
            label={'Phone Number'}
            placeholder="Enter your phone number"
            {...register('phone')}
          />

          <Input
            className={styles.passwordInput}
            type={'password'}
            label={'Password'}
            placeholder="Enter your password"
            {...register('password')}
          />

          <Input
            className={styles.passwordInput}
            type={'password'}
            label={'Confirm Password'}
            placeholder="Confirm your password"
            {...register('confirmPassword')}
          />

          <Button
            isLoading={apiSignUp.isLoading}
            text={'sign up'}
            type="submit"
          />
        </form>
        <ReactHookFormErrorRender errors={errors} />

        <Text
          color={'Gray'}
          size={'Small'}
          className={styles.loginDivFormContainerHaveAccount}
        >
          Already have an account?&nbsp;&nbsp;
          <Link to={routes.auth.login.abs_path}>Sign in here</Link>
        </Text>
      </div>
    </div>
  )
}

export default SignupPage
