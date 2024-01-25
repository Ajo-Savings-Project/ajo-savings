import Form from './Form/Form'
import Modal from '../Modal'

import { useAuth } from 'contexts'

import styles from './kyc.module.scss'
// import classNames from 'classnames'
const KYCSetup = () => {
  const { kycComplete } = useAuth()

  if (kycComplete) {
    return null
  }
  return (
    <Modal
      modalContentClassName={`${styles.modal} ${'animate__animated animate__slideInUp animate__delay-3'}`}
      renderOnOpen={({ onOpen }) => (
        <div className={styles.modalHeader}>
          Complete account setup.{' '}
          <button className={styles.modalHeaderBtn} onClick={onOpen}>
            Click here
          </button>
        </div>
      )}
      renderModalContent={({ onClose }) => <Form onClose={onClose} />}
    ></Modal>
  )
}

export default KYCSetup
