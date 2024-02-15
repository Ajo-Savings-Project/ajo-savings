import {
  Text,
  Input,
  Button,
  ReactHookFormErrorRender,
  appNotify,
  CountDown,
} from 'components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  useResetPasswordMutation,
  ResetPasswordSchema,
  ChangePasswordSchema,
  useChangePasswordMutation,
} from './requests'
import { z } from 'zod'
import { routes } from 'router'
import styles from './resetPassword.module.scss'

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
const ResetPasswordPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  })
  const {
    register: pRegister,
    handleSubmit: pHandleSubmit,
    formState: { errors: pErrors, isSubmitting: pIsSubmitting },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const [isDisabled, setIsDisabled] = useState(false)

  const disableButtonResetPasswordButton = (v: boolean) => setIsDisabled(v)

  const apiResetPassword = useResetPasswordMutation()

  const handleResetPassword = async (values: ResetPasswordSchemaType) => {
    await apiResetPassword.mutateAsync(values)
    disableButtonResetPasswordButton(true)
    appNotify(
      'success',
      <>
        <p>
          You will receive an email at <b>{values.email}</b> if you have an
          account with us.
        </p>
        <br />
        <p>Kindly follow the instruction in the email.</p>
      </>
    )
  }

  const apiChangePassword = useChangePasswordMutation()
  const handleChangePassword = async (values: ChangePasswordSchemaType) => {
    const tokenUrl = new URLSearchParams(location.search)
    const res = await apiChangePassword.mutateAsync({
      ...values,
      token: tokenUrl.get('verify') ?? '',
    })
    setIsDisabled(true)
    setTimeout(
      () =>
        navigate(routes.auth.login.abs_path, {
          state: { email: res?.data.email },
        }),
      5000
    )
    appNotify(
      'success',
      <>
        <p>You have reset your password successfully.</p>
        <br />
        <p>
          You can close this window or you will be redirected to Login shortly.
        </p>
      </>
    )
  }

  return (
    <div className={styles.reset}>
      <Text
        level={1}
        size={'Subtext'}
        content={'Reset your password'}
        style={{ textAlign: 'center' }}
        className={styles.resetTopText}
      />
      {!location.search && (
        <Text
          color={'Gray'}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
          content={
            'Enter your email below and we’ll send you instructions on how to reset your password.'
          }
          className={styles.resetTopSubText}
        />
      )}
      <ReactHookFormErrorRender errors={location.search ? pErrors : errors} />
      <form
        onSubmit={
          location.search
            ? pHandleSubmit(handleChangePassword)
            : handleSubmit(handleResetPassword)
        }
      >
        {location.search ? (
          <>
            <Input
              type={'password'}
              label={'New Password'}
              {...pRegister('newPassword')}
            />
            <Input
              type={'password'}
              label={'Confirm Password'}
              {...pRegister('confirmPassword')}
            />
          </>
        ) : (
          <Input
            label={'Email Address'}
            placeholder={'Enter your Email'}
            {...register('email')}
          />
        )}
        <Button
          isLoading={isSubmitting || pIsSubmitting}
          type="submit"
          disabled={isDisabled}
        >
          {location.search ? 'Reset Password' : 'Send reset instructions'}
        </Button>
        {!location.search && (
          <CountDown
            isDisabled={isDisabled}
            setIsDisabled={disableButtonResetPasswordButton}
          />
        )}
      </form>
      <Text>
        Go back to&nbsp;{' '}
        <Link to={routes.auth.login.abs_path}>Sign in here</Link>
      </Text>
    </div>
  )
}

export default ResetPasswordPage
