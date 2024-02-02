import { Text, Modal } from 'components'
import { Link } from 'react-router-dom'
import styles from './savingsHeader.module.scss'
import SetTarget from '../SetTarget'

const SavingsHeader = () => {
  return (
    <div className={styles.goalsHeader}>
      <Text content={'My Goals'} size={'Subtext'} />
      <Modal
        modalContentClassName={styles.modalContent}
        disableOutsideClose
        renderOnOpen={({ onOpen }) => (
          <Link onClick={onOpen} to={''}>
            Add New Goal
          </Link>
        )}
        renderModalContent={({ onClose }) => <SetTarget onClose={onClose} />}
      />
    </div>
  )
}

export default SavingsHeader
