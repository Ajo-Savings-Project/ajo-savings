import classNames from 'classnames'
import { useAuth } from 'contexts'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routes } from 'router'
import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
import { Text } from '../components'
import { HEADER_TITLE } from '../appConstants'
import styles from './authLayout.module.scss'

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
        <div style={{ backgroundColor: 'var(--primary-500)', padding: '1rem' }}>
          <Text
            style={{ textAlign: 'center' }}
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
          <Text
            font={'Bodoni'}
            className={classNames('app-logo')}
            content={HEADER_TITLE}
          />
          <div>image</div>
        </div>
        <div className={styles.layoutForm}>
          <section>
            <Outlet />
          </section>
          <footer>footer</footer>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
