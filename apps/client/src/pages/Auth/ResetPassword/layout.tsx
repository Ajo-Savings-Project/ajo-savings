import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { HEADER_TITLE } from '../../../appConstants'
import { Text } from '../../../components'
import { useAuth } from '../../../contexts'
// import { AuthLayoutFooter } from '../../../layouts/authLayout.tsx'
import { routes } from '../../../router'
import { getHeaderTitle } from '../../../utils/getHeaderTitle.ts'
import styles from './resetPassword.module.scss'

const ResetPasswordLayout = () => {
  const { isAuth } = useAuth()
  const location = useLocation()

  if (isAuth) {
    const prevPath = location.state?.from?.pathname
    return <Navigate to={prevPath || routes.dashboard.root.path} replace />
  }

  return (
    <>
      <Helmet title={getHeaderTitle('Reset password')} />
      <div className={styles.layout}>
        <Text
          className={classNames(styles.layoutLogo, 'app-logo')}
          font={'Bodoni'}
          color="Primary"
          content={HEADER_TITLE}
        />
        <div className={styles.layoutContent}>
          <Outlet />
        </div>
        {/* <AuthLayoutFooter className={styles.layoutFooter} /> */}
      </div>
    </>
  )
}

export default ResetPasswordLayout
