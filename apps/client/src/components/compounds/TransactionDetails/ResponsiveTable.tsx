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
                        width: '70px',
                        height: '70px',
                      }}
                      src={row.receiver.avatar.replace(
                        'idx',
                        `${index}-${idx}`
                      )}
                      alt=""
                    />
                  </div>
                  <div className={styles.wrapperNames}>
                    <Text content={row.receiver.firstName} size="Default" />
                    <Text content={row.receiver.lastName} size="Default" />
                  </div>
                </div>
                <div className={styles.Others}>
                  <div className={styles.OthersFlex1}>
                    <Text
                      style={{ width: '150px' }}
                      content={row.type}
                      size="Default"
                    />
                    <Text
                      style={{ width: '200px' }}
                      content={row.date}
                      size="Small"
                    />

                    <Text
                      style={{ width: '120px' }}
                      content={formatTimeFromISOString(row.date)}
                      size="Default"
                    />
                  </div>
                  <div className={styles.OthersFlex2}>
                    <Text
                      style={{ width: '100px' }}
                      content={row.amount as string}
                      size="Default"
                    />
                    <Text
                      style={{
                        width: '100px',
                        // ...statusColor({ status: row.status }),
                        color:
                          row.status === 'completed'
                            ? 'green'
                            : row.status === 'pending'
                              ? 'orange'
                              : 'red',
                      }}
                      content={row.status}
                      size="Default"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
