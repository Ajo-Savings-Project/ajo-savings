import classNames from 'classnames'
import AccountSnippet from './AccountSnippet.tsx'
import styles from './dashboardheader.module.scss'
import SearchBar from '../SearchBar'
import MoreIcon from './bar.svg?react'

const DashboardHeader = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => {
  return (
    <header className={classNames('container', styles.header, className)}>
      <button onClick={onClick}>
        <MoreIcon />
      </button>
      <div>
        <SearchBar />
        <AccountSnippet />
      </div>
    </header>
  )
}

export default DashboardHeader
