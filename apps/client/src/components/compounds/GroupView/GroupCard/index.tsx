import React from 'react'
import { Text } from 'components'
import styles from './cardComponent.module.scss'
import { ViewData } from '../ContributionDetails/mockData'

interface Props {}

const CardComponent: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        {ViewData.map((item, index) => (
          <div key={index} className={styles.row}>
            <Text content={item.label} className={styles.label} />
            <Text content={item.value} className={styles.value} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardComponent
