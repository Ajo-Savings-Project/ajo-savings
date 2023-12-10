import { Text, Input, Button, ReactHookFormErrorRender } from 'components'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import styles from './resetPassword.module.scss'

type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>
type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>
const ResetPasswordPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
    navigate(routes.auth.login.abs_path)
    await apiChangePassword.mutateAsync(values)
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
        <Button type="submit">
          {location.search ? 'Reset Password' : 'Send reset instructions'}
        </Button>
      </form>
      <Text>
        Go back to&nbsp;{' '}
        <Link to={routes.auth.login.abs_path}>Sign in here</Link>
      </Text>
    </div>
  )
}

export default ResetPasswordPage
