import { useState, PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'
import styles from './modal.module.scss'

type RenderModalContentT = { onClose: () => void }
type RenderModalOnOpenT = { onOpen: () => void }

interface ModalProps {
  renderModalContent: ({ onClose }: RenderModalContentT) => React.ReactElement
  renderOnOpen: ({ onOpen }: RenderModalOnOpenT) => React.ReactElement
  initialState: boolean
}

export default function Modal({
  initialState,
  children,
  renderOnOpen,
  renderModalContent,
}: PropsWithChildren<ModalProps>) {
  const [showModal, setShowModal] = useState(Boolean(initialState))

  return (
    <>
      {renderOnOpen({ onOpen: () => setShowModal(true) })}

      {showModal &&
        createPortal(
          <div className={styles.modalContainer}>
            <div
              onClick={() => setShowModal(false)}
              className={styles.overlay}
            />
            {children ||
              renderModalContent({ onClose: () => setShowModal(false) })}
            <div />
          </div>,
          document.body
        )}
    </>
  )
}
