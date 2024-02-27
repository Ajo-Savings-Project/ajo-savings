import classNames from 'classnames'
import { AutoLogOut, DashboardHeader, Sidebar } from 'components'
import { useAuth } from 'contexts'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import routes from 'router/routes.ts'
import { getHeaderTitle } from 'utils/getHeaderTitle.ts'
import request from '../api'
import styles from './dashboardLayout.module.scss'

const DashboardLayout = () => {
  const { isAuth, id, handleStateUpdate } = useAuth()
  const location = useLocation()

  const pageTitle = useLocation().pathname

  const [showSidebar, setShowSidebar] = useState(false)

  useQuery({
    queryKey: [id, 'user'],
    queryFn: () => request.get('/users/profile'),
    onSuccess: ({ data }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      handleStateUpdate(data.data)
    },
    enabled: isAuth,
  })

  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate
        to={routes.auth.login.abs_path}
        state={{ from: location }}
        replace
      />
    )
  }

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      <AutoLogOut />
      <Helmet title={getHeaderTitle(pageTitle)} />
      <div className={styles.layout}>
        <aside>
          <Sidebar
            className={classNames(styles.layoutSidebar, {
              [styles.layoutSidebarActive]: showSidebar,
            })}
          />
          <div
            role={'presentation'}
            className={classNames({
              [styles.layoutSidebarOverlay]: showSidebar,
            })}
            onClick={handleToggleSidebar}
          />
        </aside>
        <div>
          <DashboardHeader
            onClick={handleToggleSidebar}
            className={styles.layoutHeader}
          />
          <main className={styles.layoutMain}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
