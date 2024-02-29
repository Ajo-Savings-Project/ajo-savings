// TableComponent.tsx
import React from 'react'
import { Text } from 'components'
import styles from './tableComponent.module.scss'
import { mockTransactions } from '../ContributionDetails/helper'
import { transData } from '../ContributionDetails/mockData'

const transactions = mockTransactions(transData)

interface Props {}

const TableComponent: React.FC<Props> = () => {
  const getPerformanceColor = (performance: string | number): string => {
    if (performance === 'new User') {
      return 'blue'
    } else {
      const percentage =
        typeof performance === 'number' ? performance : parseFloat(performance)
      return percentage >= 50 ? 'green' : 'red'
    }
  }

  return (
    <div className={styles.container}>
      <Text content={'Members'} className={styles.member} size={'Small'} />
      <div className={styles.containerTable}>
        <div className={styles.head}>
          <Text
            content={'SLOT'}
            className={styles.serialNumber}
            size={'Small'}
          />
          <Text content={'NAME'} className={styles.member} size={'Small'} />
          <Text
            content={'PERFORMANCE'}
            className={styles.performance}
            size={'Small'}
          />
        </div>
        {transactions.map((data, index) => (
          <div className={styles.row} key={index}>
            <Text
              content={(index + 1).toString()}
              className={styles.serialNumber}
            />
            <Text content={data.name} className={styles.name} />
            <Text
              content={data.performance}
              className={styles.performance}
              style={{ color: getPerformanceColor(data.performance) }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableComponent
