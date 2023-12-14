import classNames from 'classnames'
import { useState, PropsWithChildren, useEffect, ReactElement } from 'react'

import { createPortal } from 'react-dom'
import styles from './modal.module.scss'

type RenderModalContentT = { onClose: () => void }
type RenderModalOnOpenT = { onOpen: () => void }

interface ModalProps {
  renderModalContent: ({ onClose }: RenderModalContentT) => ReactElement
  renderOnOpen: ({ onOpen }: RenderModalOnOpenT) => ReactElement
  initialState?: boolean
  disableOutsideClose?: boolean
}

export default function Modal({
  initialState,
  children,
  renderOnOpen,
  renderModalContent,
  disableOutsideClose,
}: PropsWithChildren<ModalProps>) {
  const [showModal, setShowModal] = useState(Boolean(initialState))

  useEffect(() => {
    // prevents scrolling when open
    document.body.style.overflow = showModal ? 'hidden' : 'unset'
  }, [showModal])

  return (
    <>
      {renderOnOpen({ onOpen: () => setShowModal(true) })}

      {showModal &&
        createPortal(
          <div
            className={classNames(styles.modalContainer, {
              [styles.modalContainerScroll]: showModal,
            })}
          >
            <div
              onClick={
                !disableOutsideClose ? () => setShowModal(false) : undefined
              }
              className={styles.overlay}
            />
            <div className={styles.modalContent}>
              {children ||
                renderModalContent({ onClose: () => setShowModal(false) })}
            </div>
            <div />
          </div>,
          document.body
        )}
    </>
  )
}
