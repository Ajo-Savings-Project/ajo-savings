import { formatTimeFromISOString, mockTransactions } from './helpers.ts'
import { transData } from './mockData.ts'
import styles from './ResponsiveTable.module.scss'
import { Text } from 'components'

const transactions = mockTransactions(transData)

export const TransactionsTable = () => {
  return (
    <div>
      {Object.entries(transactions).map(([group, data], index) => {
        return (
          <div key={index} className={styles.Container}>
            <Text content={group} size="Default" />
            {data.map((row, idx) => (
              <div key={index + idx} className={styles.row}>
                <div className={styles.wrapper}>
                  <div className={styles.wrapperImage}>
                    <img
                      style={{
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                      }}
                      src={row.receiver.avatar.replace(
                        'idx',
                        `${index}-${idx}`
                      )}
                      alt=""
                    />
                  </div>
                  <div className={styles.wrapperNames}>
                    <Text content={row.receiver.firstName} size="Small" />
                    <Text content={row.receiver.lastName} size="Small" />
                  </div>
                </div>
                <div className={styles.divider}></div>

                <div className={styles.type}>
                  <Text content="City:"  className = {styles.hide} />
                  <Text content={row.type} size="Small" />
                </div>

                <div className={styles.divider}></div>
                <div className={styles.type}>
                  <Text content="Date:" size="Small" className = {styles.hide} />
                  <Text content={row.date} size="Small" />
                </div>

                <div className={styles.divider}></div>
                <div className={styles.type}>
                  <Text content="Time:" size="Small"  className = {styles.hide}  />
                  <Text
                    content={formatTimeFromISOString(row.date)}
                    size="Small"
                  />
                </div>

                <div className={styles.divider}></div>
                <div className={styles.type}>
                  <Text content="Amount:" size="Small"  className = {styles.hide}  />
                  <Text content={row.amount as string} />
                </div>

                <div className={styles.divider}></div>
                <div className={styles.type}>
                  <Text content="Status:" size="Small"  className = {styles.hide}  />
                  <Text
                    style={{
                      color:
                        row.status === 'completed'
                          ? 'green'
                          : row.status === 'pending'
                            ? 'orange'
                            : 'red',
                    }}
                    content={row.status}
                    size="Small"
                  />
                </div>

                <div className={styles.divider}></div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
