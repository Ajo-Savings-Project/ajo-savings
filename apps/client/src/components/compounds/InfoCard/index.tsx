import { PropsWithChildren } from 'react'
import styles from './infoCard.module.scss'
import { Text } from 'components'
import Close from './images/Close.svg?react'
import Check from './images/CheckOutline.svg?react'

interface CardProps {
  text: string
  Subtext: string
  onClick: () => void
}

const InfoCard = ({
  text,
  Subtext,
  children,
  onClick,
}: PropsWithChildren<CardProps>) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContainerIcon}>
        <Close onClick={onClick} />
      </div>
      {children || (
        <div className={styles.cardBody}>
          <div className={styles.cardBodyLogo}>
            <Check />
          </div>
          <Text size={'Label'} content={text} className={styles.cardBodyText} />
          <Text content={Subtext} />
        </div>
      )}
    </div>
  )
}

export default InfoCard
