import React from 'react'
import { Text } from 'components'
import styles from './cardComponent.module.scss'

interface CardData {
  label1: string
  value1: string
  label2: string
  value2: string
}

interface Props {
  cardData: CardData[]
}

const CardComponent: React.FC<Props> = ({ cardData }) => {
  return (
    <div className={styles.containerLastly}>
      <div className={styles.firstCard}>
        {cardData.map((card, index) => (
          <div key={index} className={styles.leftCard}>
            <div className={styles.left}>
              <Text
                content={card.label1}
                size={'Small'}
                className={styles.leftOne}
                style={{ color: 'var(--gray-500)' }}
              />
              <Text
                content={card.value1}
                size={'Small'}
                className={styles.rightOne}
              />
            </div>
            <div className={styles.right}>
              <Text
                content={card.label2}
                size={'Small'}
                className={styles.leftOne}
                style={{ color: 'var(--gray-500)' }}
              />
              <Text
                content={card.value2}
                size={'Small'}
                className={styles.rightOne}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardComponent
