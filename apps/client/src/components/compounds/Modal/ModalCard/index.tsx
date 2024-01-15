import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { Card } from 'components'
import styles from './styles.module.scss'
import Close from '../images/Close.svg?react'

interface CardProps {
  onClick: () => void
  className?: string
  modalClassName?: string
}

const ModalCard = ({
  children,
  onClick,
  className,
  modalClassName,
}: PropsWithChildren<CardProps>) => {
  return (
    <Card className={classNames(styles.modalCard, modalClassName)}>
      <div className={styles.modalCardIcon}>
        <button onClick={onClick}>
          <Close />
        </button>
      </div>
      <div className={classNames(styles.modalCardContent, className)}>
        {children}
      </div>
    </Card>
  )
}

export default ModalCard
