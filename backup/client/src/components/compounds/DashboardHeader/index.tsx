import classNames from 'classnames'
import styles from './dashboardheader.module.scss'

const DashboardHeader = ({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) => {
  return (
    <header className={classNames('container', styles.header, className)}>
      <button onClick={onClick}>T</button>
      <div>
        <input type="text" />
        <div>A</div>
      </div>
    </header>
  )
}

export default DashboardHeader
