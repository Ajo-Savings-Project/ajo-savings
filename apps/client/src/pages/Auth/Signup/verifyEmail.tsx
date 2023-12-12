import { Text } from 'components'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import request from 'api'
import { routes } from '../../../router'

const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)

  const mutation = useMutation({
    mutationFn: async () => {
      return request.post('/verify-email', {
        token: urlParams.get('token'),
      })
    },
    mutationKey: 'verify-email',
    onSuccess: () => {
      navigate(routes.auth.login.abs_path, {
        state: { email: urlParams.get('email') },
      })
    },
    onError: (err) => {
      console.log(err)
    },
  })

  useEffect(() => {
    if (mutation.isIdle) {
      mutation.mutate()
    }
  })

  console.log(mutation.error)

  return (
    <div>
      <Text>
        {mutation.isLoading
          ? 'Verifying...'
          : 'done loading, if success redierect to login else expired token'}
      </Text>
    </div>
  )
}

export default VerifyEmailPage
