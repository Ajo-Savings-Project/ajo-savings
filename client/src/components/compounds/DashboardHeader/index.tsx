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
<<<<<<< HEAD
    <header className={classNames('container', styles.header, className)}>
      <button onClick={onClick}>T</button>
=======
    <header className={classNames(styles.header, className)}>
      <button onClick={onClick} >T</button>
>>>>>>> 01d00a2 (feature- created a frequency select button)
      <div>
        <input type="text" />
        <div>A</div>
      </div>
    </header>
  )
}

export default DashboardHeader
