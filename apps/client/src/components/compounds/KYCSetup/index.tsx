import { Modal } from '..'
import Form from './Form'
import styles from './kyc.module.scss'
import { useAuth } from 'contexts'
const KYCSetup = () => {
  const { kycComplete } = useAuth()

  if (kycComplete) {
    return null
  }
  return (
    <Modal
      modalContentClassName={styles.modal}
      renderOnOpen={({ onOpen }) => (
        <div className={styles.modalHeader}>
          Complete account setup.{' '}
          <button className={styles.modalHeaderBtn} onClick={onOpen}>
            click here
          </button>
        </div>
      )}
      renderModalContent={({ onClose }) => <Form onClose={onClose} />}
    />
  )
}

export default KYCSetup
