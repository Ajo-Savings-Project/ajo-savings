import { Text } from 'components'
import { getPerformanceColor } from './helpers.ts'
import { Transaction } from './mockData.ts'
import styles from './tableComponent.module.scss'

const MembersPerformance = ({ data }: { data: Transaction[] }) => {
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
        {data.map(({ name, performance }, index) => (
          <div className={styles.row} key={index}>
            <Text
              content={(index + 1).toString()}
              className={styles.serialNumber}
            />
            <Text content={name} className={styles.name} />
            <Text
              content={`${performance}%`}
              className={styles.performance}
              style={{ color: getPerformanceColor(performance) }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MembersPerformance
