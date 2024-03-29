import React from 'react'
import { Text } from 'components'
import { Link } from 'react-router-dom'
import { viewData } from './mockData.ts'
import styles from './cardComponent.module.scss'
import { IoChevronForward } from 'react-icons/io5'

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
        {isMember && (
          <Link to={'/flow'} className={styles.flow}>
            <Text content={'View Flow'} style={{ color: 'blue' }} />
            <IoChevronForward style={{ color: 'blue' }} />
          </Link>
        )}
      </div>
    </div>
  )
}

export default ContributionOverview
