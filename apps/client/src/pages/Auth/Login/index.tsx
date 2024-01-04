import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { Button, Input, ReactHookFormErrorRender, Text } from 'components'
import { useAuth } from 'contexts'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { z } from 'zod'
import { routes } from 'router'
import { HEADER_TITLE } from '../../../appConstants'
import styles from './login.module.scss'
import { useLoginMutation, LoginSchema } from './requests.ts'
import GoogleIcon from './GoogleGoogleIcon.svg?react'

type LoginSchemaType = z.infer<typeof LoginSchema>

const LoginPage = () => {
  const { state } = useLocation()

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
    const data = await apiLogin.mutateAsync(values)
    if (data) handleAuthSession(data.data)
  }

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
        <Button className={styles.googleButton}>
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
          <Button text={'login'} type="submit" />
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
