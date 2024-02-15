import { appNotify, Text } from 'components'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import request from 'api'
import { routes } from '../../../router'
import { VerifyResponseSchema } from './request.ts'

const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await request.post<typeof VerifyResponseSchema>(
        '/users/verify-email',
        {
          token: urlParams.get('user'),
        }
      )
      return VerifyResponseSchema.safeParse(res.data)
    },
    mutationKey: 'verify-email',
    onSuccess: (res) => {
      if (res.success) {
        if (res.data.status === 'success') {
          navigate(routes.auth.login.abs_path, {
            state: res.data.user,
          })
        } else {
          appNotify(
            'error',
            'It seems like that link has expired, please try again'
          )
          navigate(routes.auth.signup.abs_path, {
            state: res.data.user,
          })
        }
      } else {
        appNotify('error', "We couldn't verify your email, please try again")
      }
    },
  })

  useEffect(() => {
    if (mutation.isIdle) {
      mutation.mutate()
    }
  }, [mutation])

  return (
    <div>
      <Text>
        {mutation.isLoading
          ? 'Verifying...'
          : 'Done loading, this page will be redirected to login'}
      </Text>
    </div>
  )
}

export default VerifyEmailPage
