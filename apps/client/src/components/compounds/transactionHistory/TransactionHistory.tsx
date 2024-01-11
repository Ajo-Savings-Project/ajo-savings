import { Card, Text } from 'components'
import styles from './transactionHistory.module.scss'
import { useState } from 'react'

const table = [
  {
    id: 1,
    receiver: 'Bolade Adegbete',
    type: 'Lagos Corp Group',
    date: '30 May 2023',
    amount: '5000',
  },
  {
    id: 2,
    receiver: 'Bolade Adegbete',
    type: 'Lagos Corp Group',
    date: '30 May 2023',
    amount: '5000',
  },
  {
    id: 3,
    receiver: 'Bolade Adegbete',
    type: 'Lagos Corp Group',
    date: '30 May 2023',
    amount: '5000',
  },
]

const TransactionHistory = () => {
  const [selected, setSelected] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setSelected(index)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <Text content={'TRANSACTION HISTORY'} size={'Small'} />
        <div className={styles.select}>
          <Text
            content={'Recently'}
            size={'Small'}
            className={` ${selected === 0 ? 'selected' : ''} ${styles.button}`}
            onClick={() => handleClick(0)}
          />
          <Text
            content={'Oldest'}
            size={'Small'}
            className={`button ${selected === 2 ? 'selected' : ''} ${
              styles.button
            }`}
            onClick={() => handleClick(1)}
          />
          <Text
            content={'More'}
            size={'Small'}
            className={`button ${selected === 2 ? 'selected' : ''} ${
              styles.button
            }`}
            onClick={() => handleClick(2)}
          />
        </div>
      </div>

      <Card className={styles.containerSection}>
        <table>
          <thead>
            <tr>
              <th>
                <Text
                  content={'Receiver'}
                  size={'Small'}
                  className={styles.head}
                />
              </th>
              <th>
                <Text content={'Type'} size={'Small'} className={styles.head} />
              </th>
              <th>
                <Text content={'Date'} size={'Small'} className={styles.head} />
              </th>
              <th>
                <Text
                  content={'Amount'}
                  size={'Small'}
                  className={styles.head}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((items, index) => (
              <tr key={index}>
                <td>
                  <Text content={items.receiver} size={'Small'} />
                </td>
                <td>
                  <Text content={items.type} size={'Small'} />
                </td>
                <td>
                  <Text content={items.date} size={'Small'} />
                </td>
                <td>
                  <Text content={`₦ ${items.amount}`} size={'Small'} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export default TransactionHistory
