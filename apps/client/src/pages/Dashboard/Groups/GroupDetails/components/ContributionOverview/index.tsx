import React from 'react'
import { Text } from 'components'
import { Link } from 'react-router-dom'
import { viewData } from './mockData.ts'
import styles from './cardComponent.module.scss'

interface Props {
  isMember?: boolean
}

const ContributionOverview: React.FC<Props> = ({ isMember }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerCard}>
        {viewData.map((item, index) => (
          <div key={index} className={styles.row}>
            <Text content={item.label} className={styles.label} />
            <Text content={item.value} className={styles.value} />
          </div>
        ))}
      </div>
      {isMember && (
        <Link to={'/flow'}>
          <Text content={'viewFlow'} />
        </Link>
      )}
    </div>
  )
}

export default ContributionOverview
