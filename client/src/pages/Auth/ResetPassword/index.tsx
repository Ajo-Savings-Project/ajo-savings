import classNames from 'classnames'
import { Text, Input, Button, ReactHookFormErrorRender } from 'components'
import styles from './resetPassword.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  useResetPasswordMutation,
  ResetPasswordSchema,
  ChangePasswordSchema,
  useChangePasswordMutation,
} from './requests'
import { z } from 'zod'
import { routes } from 'router'
import { HEADER_TITLE } from 'appConstants'

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
const ResetPasswordPage = () => {
  const location = useLocation()
  console.log(location)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  })
  const {
    register: pRegister,
    handleSubmit: pHandleSubmit,
    formState: { errors: pErrors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const apiResetPassword = useResetPasswordMutation()
  const handleResetPassword = async (values: ResetPasswordSchemaType) => {
    await apiResetPassword.mutateAsync(values)
  }
  const apiChangePassword = useChangePasswordMutation()
  const handleChangePassword = async (values: ChangePasswordSchemaType) => {
    await apiChangePassword.mutateAsync(values)
  }

  return (
    <div className={styles.reset}>
      <Text
        className={classNames('app-logo')}
        font={'Bodoni'}
        color="Primary"
        content={HEADER_TITLE}
      />
      <div className={styles.resetAllWrapper}>
        <div className={styles.resetAllWrapperContent}>
          <Text
            level={2}
            font={'Inter'}
            content={'Reset your password'}
            className={styles.resetTopText}
          />
          {!location.search && (
            <Text
              font={'Inter'}
              content={
                'Enter your email below and we’ll send you instructions on how to reset your password.'
              }
              className={styles.resetTopSubText}
            />
          )}
          {location.search ? (
            <form
              className={styles.resetForm}
              onSubmit={pHandleSubmit(handleChangePassword)}
            >
              <Input label={'New Password'} {...pRegister('newPassword')} />
              <Input
                label={'Confirm Password'}
                {...pRegister('confirmPassword')}
              />
              <ReactHookFormErrorRender errors={pErrors} />
              <Button
                text={'Reset Password'}
                style={{ width: '100%', marginTop: '1.5rem' }}
                type="submit"
              />
              <Text className={styles.resetFormFooterText}>
                {' '}
                Go back to{' '}
                <Link
                  to={routes.auth.login.abs_path}
                  className={styles.resetFormLink}
                >
                  Sign in here
                </Link>
              </Text>
            </form>
          ) : (
            <form
              className={styles.resetForm}
              onSubmit={handleSubmit(handleResetPassword)}
            >
              <Input
                label={'Email Address'}
                placeholder={'Enter your Email'}
                {...register('email')}
              />
              <ReactHookFormErrorRender errors={errors} />
              <Button
                text={'Send reset instructions'}
                style={{ width: '100%', marginTop: '1.5rem' }}
                type="submit"
              />
              <Text className={styles.resetFormFooterText}>
                {' '}
                Go back to{' '}
                <Link
                  to={routes.auth.login.abs_path}
                  className={styles.resetFormLink}
                >
                  Sign in here
                </Link>
              </Text>
            </form>
          )}
        </div>
      </div>

      <footer className={styles.resetFooter}>
        <Text content={'Privacy Policy'} />
        <Text content={'Copyright 2022'} />
      </footer>
    </div>
  )
}

export default ResetPasswordPage
