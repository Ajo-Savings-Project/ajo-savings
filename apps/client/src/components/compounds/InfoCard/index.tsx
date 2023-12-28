import { PropsWithChildren } from 'react'
import styles from './infoCard.module.scss'
import { ModalCard, Text } from 'components'
import Check from './images/CheckOutline.svg?react'

interface CardProps {
  text: string
  Subtext: string
  onClick: () => void
}

const InfoCard = ({ text, Subtext, onClick }: PropsWithChildren<CardProps>) => {
  return (
    <ModalCard onClick={onClick} className={styles.cardContainer}>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyLogo}>
          <Check />
        </div>
        <Text size={'Label'} content={text} className={styles.cardBodyText} />
        <Text content={Subtext} />
      </div>
    </ModalCard>
  )
}

export default InfoCard
