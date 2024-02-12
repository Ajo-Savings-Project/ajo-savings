import SavingsTargetCard from 'components/compounds/SavingsTargetCard'
import { Modal, Text } from '../../../components'
import SetTarget from '../../../components/compounds/SetTarget'
import styles from './savings.module.scss'

const SavingsPage = () => {
  return (
    <div>
      <div className={styles.goalsHeader}>
        <Text content={'My Goals'} size={'Subtext'} />
        <Modal
          modalContentClassName={styles.modalContent}
          disableOutsideClose
          renderOnOpen={({ onOpen }) => (
            <button className={'link clear-button'} onClick={onOpen}>
              Add New Goal
            </button>
          )}
          renderModalContent={({ onClose }) => <SetTarget onClose={onClose} />}
        />
      </div>
      <div>
        <SavingsTargetCard
          img="https://picsum.photos/200/300"
          title={'Travel'}
          description={'Trip to Bali'}
          savedAmount={5000000}
          totalAmount={10000000}
        />
      </div>
    </div>
  )
}

export default SavingsPage
