import { useAuth } from 'contexts'
import { Helmet } from 'react-helmet'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routes } from 'router'
import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
import styles from './authLayout.module.scss'

const AuthLayout = () => {
  const { isAuth } = useAuth()
  const location = useLocation()

  if (isAuth) {
    const prevPath = location.state?.from?.pathname
    return <Navigate to={prevPath || routes.dashboard.root.path} replace />
  }

  const pageTitle = location.pathname

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title style={{ textTransform: 'capitalize' }}>
          {getHeaderTitle(pageTitle)}
        </title>
      </Helmet>
      <div className={styles.layout}>
        <div className={styles.layoutBg}>image</div>
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
