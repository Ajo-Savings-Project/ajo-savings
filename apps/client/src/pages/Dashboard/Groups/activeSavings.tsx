import { Link } from 'react-router-dom'
import { Modal, Text } from 'components'
import { routes } from 'router'
import styles from './activeSavings.module.scss'
import MyActiveSavings from 'components/compounds/ActiveSavings/MyActiveSavings'

const ActiveSavings = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerHeader}>
        <Text content="Active Savings" size="Label" />
        <div className={styles.ContainerHeaderRight}>
          <Modal
            renderOnOpen={({ onOpen }) => (
              <button
                onClick={onOpen}
                style={{
                  background: 'none',
                  outline: 'none',
                  border: 'none',
                }}
              >
                <Text
                  content="Create New Group"
                  size="Small"
                  className={styles.ContainerHeaderRightText}
                />
              </button>
            )}
            renderModalContent={() => <div>Create new group body</div>}
          />
          <span className={styles.ContainerHeaderRightDivider}>
            <p>.</p>
          </span>
          <Link
            to={routes.dashboard.groups.abs_path + '?page=explore'}
            style={{ textDecoration: 'none' }}
          >
            <Text
              content="Explore Groups"
              size="Small"
              className={styles.ContainerHeaderRightText}
            />
          </Link>
        </div>
      </div>
      <div>
        <MyActiveSavings />
      </div>
    </div>
  )
}

export default ActiveSavings
