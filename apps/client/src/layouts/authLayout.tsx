import classNames from 'classnames'
import { useAuth } from 'contexts'
import { Helmet } from 'react-helmet'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { routes } from 'router'
import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
import { AuthCarousel, Text } from 'components'
import { HEADER_TITLE } from '../appConstants'
import styles from './authLayout.module.scss'

export const AuthLayoutFooter = ({ className }: { className?: string }) => {
  return (
    <footer className={classNames(styles.footer, className)}>
      <Link to={'#'}>Privacy Policy</Link>
      <Text size={'Small'}> &copy; {HEADER_TITLE}. 2023</Text>
    </footer>
  )
}

const AuthLayout = () => {
  const { isAuth, showAutoLogoutMessage } = useAuth()
  const location = useLocation()

  if (isAuth) {
    const prevPath = location.state?.from?.pathname
    return <Navigate to={prevPath || routes.dashboard.root.path} replace />
  }

  const pageTitle = location.pathname

  return (
    <>
      {showAutoLogoutMessage && (
        <div className={styles.autoLogout}>
          <Text
            color={'White'}
            content={'You were logged out due to inactivity.'}
          />
        </div>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getHeaderTitle(pageTitle)}</title>
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.layoutBg}>
          <AuthCarousel />
        </div>
        <div className={styles.layoutForm}>
          <section>
            <Outlet />
          </section>
          <AuthLayoutFooter />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
