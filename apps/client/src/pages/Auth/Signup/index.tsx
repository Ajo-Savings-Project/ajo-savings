import { Link, useNavigate } from 'react-router-dom'
import { Button, Text, Input, ReactHookFormErrorRender } from 'components'
import { routes } from 'router'
import { HEADER_TITLE } from 'appConstants'
import classNames from 'classnames'
import GoogleIcon from '../Login/GoogleGoogleIcon.svg?react'
import styles from '../Login/login.module.scss'
import { RegisterSchema, useRegisterMutation } from './request'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type RegisterSchemaType = z.infer<typeof RegisterSchema>

const SignupPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  })

  const apiSignUp = useRegisterMutation()

  const handleRegister = async (values: RegisterSchemaType) => {
    try {
      await apiSignUp.mutateAsync(values)
    } finally {
      console.log(routes, 'routes')

      navigate(routes.auth.login.abs_path)
    }
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
        <Text content={'Welcome back to Ajó Savings.'} />
      </div>
      <div className={styles.loginDivFormContainer}>
        <Button className={styles.googleButton}>
          <GoogleIcon />
          Sign in with Google
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
            {...register('phoneNumber')}
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

          <Button text={'sign up'} type="submit" />
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
