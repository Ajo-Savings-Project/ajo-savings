import classNames from 'classnames'
import { Text } from 'components/elements'
import { useAuth } from 'contexts'
import { HTMLAttributes, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'router/routes.ts'
import styles from './sidebar.module.scss'
import DashboardIcon from './icons/dashboard.svg?react'
import SavingsIcon from './icons/savings.svg?react'

interface ListItemsI {
  heading: string
  items: Array<{
    icon: ReactElement
    name: string
    link: string
  }>
}

const listItems: Array<ListItemsI> = [
  {
    heading: 'overview',
    items: [
      {
        icon: <DashboardIcon />,
        name: 'dashboard',
        link: routes.dashboard.root.path,
      },
      {
        icon: <SavingsIcon />,
        name: 'savings',
        link: routes.dashboard.savings.path,
      },
      {
        icon: <SavingsIcon />,
        name: 'groups',
        link: routes.dashboard.groups.path,
      },
      {
        icon: <SavingsIcon />,
        name: 'transactions',
        link: routes.dashboard.transactions.path,
      },
    ],
  },
  {
    heading: 'others',
    items: [
      {
        icon: <SavingsIcon />,
        link: routes.dashboard.settings.path,
        name: 'settings',
      },
      {
        icon: <SavingsIcon />,
        link: '',
        name: 'logout',
      },
    ],
  },
]

const Sidebar = ({ className }: Pick<HTMLAttributes<HTMLDivElement>, 'className'>) => {
  const { handleClearSession } = useAuth()

  return (
    <div className={classNames(styles.sidebar, className)}>
      <Text className={styles.sidebarLogo} font={'Bodoni'} color={'Primary600'}>
        Ajó Savings
      </Text>
      <div className={styles.scrollable}>
        {listItems.map(({ heading, items }) => {
          return (
            <>
              <Text className={styles.sidebarListHeading} color={'Grey400'}>
                {heading}
              </Text>
              <ul aria-label={`${heading} list`}>
                {items.map(({ name, icon, link }) => {
                  if (name === 'logout') {
                    return (
                      <li key={name} className={styles.sidebarList}>
                        <button
                          onClick={handleClearSession}
                          className={styles.sidebarListContent}
                        >
                          {icon}
                          <p>{name}</p>
                        </button>
                      </li>
                    )
                  }

                  return (
                    <li key={name} className={styles.sidebarList}>
                      <NavLink
                        to={link}
                        end
                        className={({ isActive }) =>
                          classNames(styles.sidebarListContent, {
                            [styles.sidebarListIsActive]: isActive,
                          })
                        }
                      >
                        {icon}
                        <p>{name}</p>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
