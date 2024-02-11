import classNames from 'classnames'
import { Text } from 'components/elements'
import { useAuth } from 'contexts'
import { Fragment, HTMLAttributes, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import routes from 'router/routes.ts'
import DashboardIcon from './icons/dashboard.svg?react'
import SavingsIcon from './icons/savings.svg?react'
import styles from './sidebar.module.scss'

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
        name: 'goals',
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

const Sidebar = ({
  className,
}: Pick<HTMLAttributes<HTMLDivElement>, 'className'>) => {
  const { handleClearSession } = useAuth()

  return (
    <div className={classNames(styles.sidebar, className)}>
      <Text
        className={classNames('app-logo', styles.sidebarLogo)}
        font={'Bodoni'}
        color={'Primary'}
      >
        Ajó Savings
      </Text>
      <div className={styles.scrollable}>
        {listItems.map(({ heading, items }) => {
          return (
            <Fragment key={heading}>
              <Text className={styles.sidebarListHeading} color={'Gray'}>
                {heading}
              </Text>
              <ul aria-label={`${heading} list`}>
                {items.map(({ name, icon, link }) => {
                  if (name === 'logout') {
                    return (
                      <li key={name} className={styles.sidebarList}>
                        <button
                          onClick={() => handleClearSession()}
                          className={styles.sidebarListContent}
                        >
                          {icon}
                          <Text color={'Inherit'}>{name}</Text>
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
                        <Text color={'Inherit'}>{name}</Text>
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
