import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'
import { getHeaderTitle } from '../../../utils/getHeaderTitle.ts'

const ResetPasswordLayout = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getHeaderTitle('Reset password')}</title>
      </Helmet>
      <div>
        set to middle for reset password
        <Outlet />
      </div>
    </>
  )
}

export default ResetPasswordLayout
