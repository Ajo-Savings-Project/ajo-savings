import Form from './Form'
import Modal from '../Modal'
import { useAuth } from 'contexts'
const KYCSetup = () => {
  const { kycComplete } = useAuth()

  if (kycComplete) {
    return null
  }
  return (
    <Modal
      renderOnOpen={({ onOpen }) => (
        <div>
          Complete account setup. <button onClick={onOpen}>Click here</button>
        </div>
      )}
      renderModalContent={({ onClose }) => <Form onClose={onClose} />}
    ></Modal>
  )
}

export default KYCSetup
