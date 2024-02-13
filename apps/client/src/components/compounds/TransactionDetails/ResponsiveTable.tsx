import {
  formatTimeFromISOString,
  getDate,
  mockTransactions,
} from './helpers.ts'
import { transData } from './mockData.ts'
import styles from './ResponsiveTable.module.scss'
import { Text } from 'components'

const transactions = mockTransactions(transData)

export const TransactionsTable = () => {
  return (
    <div>
      {Object.entries(transactions).map(([group, data], index) => {
        return (
          <div key={index} className={styles.allContainer}>
            <Text content={group} level={5} />
            <div key={index} className={styles.container}>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <tbody>
                    {data.map((row, idx) => (
                      <tr
                        key={index + idx}
                        className={styles.newTableContainer}
                      >
                        <td>
                          <img
                            src={row.receiver.avatar.replace(
                              'idx',
                              `${index}-${idx}`
                            )}
                            alt={row.receiver.name}
                          />
                        </td>
                        <td>
                          <Text content={row.receiver.name} size="Small" />
                        </td>

                        <td>
                          <Text content={row.type} size="Small" />
                        </td>
                        <td>
                          <Text content={getDate(row.date)} size="Small" />
                        </td>
                        <td>
                          <Text
                            content={formatTimeFromISOString(row.date)}
                            size="Small"
                          />
                        </td>
                        <td>
                          <Text content={row.amount.toString()} size="Small" />
                        </td>

                        <td
                          className={styles['status-cell']}
                          data-status={row.status}
                        >
                          <Text
                            content={row.status}
                            color="none"
                            size="Small"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
