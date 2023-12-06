import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, ReactHookFormErrorRender } from 'components'
import { useAuth } from 'contexts'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { routes } from 'router'
import { useLoginMutation, LoginSchema } from './requests.ts'

type LoginSchemaType = z.infer<typeof LoginSchema>

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const { handleAuthSession } = useAuth()

  const apiLogin = useLoginMutation()

  const handleLogin = async (values: LoginSchemaType) => {
    try {
      const data = await apiLogin.mutateAsync(values)
      handleAuthSession({ refreshToken: data.data })
    } finally {
      // this will be removed once login route has been implemented
      handleAuthSession({ refreshToken: 'refresh token' })
    }
  }
  return (
    <div>
      Login page
      <form action="" onSubmit={handleSubmit(handleLogin)}>
        <Input label={'email'} {...register('email')} />
        <Input label={'password'} {...register('password')} type={'password'} />
        <ReactHookFormErrorRender errors={errors} />
        <Button text={'login'} type="submit" />
      </form>
      <Link to={routes.auth.signup.abs_path}>Sign up</Link>
      <Link to={routes.auth['reset-password'].abs_path}>Forgot password?</Link>
    </div>
  )
}

export default LoginPage
