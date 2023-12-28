import { PropsWithChildren } from 'react'
import styles from './walletCard.module.scss'
import { Text } from 'components'
import Close from './close.svg?react'

interface CardProps {
  text?: string
  Subtext?: string
  onClick: () => void
  className: string
}

const WalletCard = ({
  text,
  Subtext,
  children,
  onClick,
  className,
}: PropsWithChildren<CardProps>) => {
  return (
    <div className={`styles.cardContainer, ${className}`}>
      <div className={styles.cardContainerIcon}>
        <button onClick={onClick}>
          <Close />
        </button>
      </div>
      {children || (
        <div className={styles.cardBody}>

          <Text size={'Label'} content={text} className={styles.cardBodyText} />
          <Text content={Subtext} />
        </div>
      )}
    </div>
  )
}

export default WalletCard
