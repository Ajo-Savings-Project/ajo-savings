import styles from './ResponsiveTable.module.scss'
import pic from './Image/UserImg.svg'
import UserImg from './Image/UserImg.svg'
import { Text } from 'components'

interface RowData {
  image: string
  name: string
  group: string
  date: string
  time: string
  amount: number
  status: string
}

const transData: RowData[] = [
  {
    image: UserImg,
    name: 'Oluwadamilola Nwankwo Daniel Lawrence All',
    group: 'Abuja Corp Members',
    date: '08/01/2024',
    time: '09:15:00 AM',
    amount: 50000000,
    status: 'Sent',
  },
  {
    image: pic,
    name: 'Alice Smith',
    group: 'Kano Corp Members',
    date: '28/12/2023',
    time: '10:30:45 AM',
    amount: 6000,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'IDAN Gan Gan',
    group: 'Port Harcourt Corp Members',
    date: '08/01/2024',
    time: '12:00:20 PM',
    amount: 70000000,
    status: 'Received',
  },
  {
    image: pic,
    name: 'Sophia Johnson',
    group: 'Enugu Corp Members',
    date: '07/01/2024',
    time: '02:45:10 PM',
    amount: 8000,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Daniel Brown',
    group: 'Ibadan Corp Members',
    date: '22/12/2023',
    time: '04:20:30 PM',
    amount: 9000,
    status: 'Sent',
  },
  {
    image: UserImg,
    name: 'Emily Clark',
    group: 'Lagos Corp Members',
    date: '07/01/2024',
    time: '06:15:50 PM',
    amount: 5500,
    status: 'Sent',
  },
  {
    image: UserImg,
    name: 'Matthew Turner',
    group: 'Abuja Corp Members',
    date: '09/01/2024',
    time: '08:30:25 PM',
    amount: 6200,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Olivia White',
    group: 'Kano Corp Members',
    date: '08/01/2024',
    time: '10:00:40 PM',
    amount: 7500,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'William Harris',
    group: 'Port Harcourt Corp Members',
    date: '08/01/2024',
    time: '11:45:15 PM',
    amount: 8200,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Chloe Martinez',
    group: 'Enugu Corp Members',
    date: '28/05/2023',
    time: '01:30:00 AM',
    amount: 8800,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'David Lee',
    group: 'Ibadan Corp Members',
    date: '29/12/2023',
    time: '03:20:50 AM',
    amount: 9200,
    status: 'Sent',
  },
  {
    image: UserImg,
    name: 'Emma Baker',
    group: 'Lagos Corp Members',
    date: '07/01/2024',
    time: '05:00:35 AM',
    amount: 5100,
    status: 'Sent',
  },
  {
    image: UserImg,
    name: 'James Carter',
    group: 'Abuja Corp Members',
    date: '21/12/2023',
    time: '07:10:15 AM',
    amount: 6300,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Sophie Gray',
    group: 'Kano Corp Members',
    date: '07/01/2024',
    time: '09:25:40 AM',
    amount: 7600,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Michael Cooper',
    group: 'Port Harcourt Corp Members',
    date: '28/05/2023',
    time: '11:00:00 AM',
    amount: 8300,
    status: 'Sent',
  },
  {
    image: UserImg,
    name: 'Ava Wilson',
    group: 'Enugu Corp Members',
    date: '22/12/2023',
    time: '12:45:30 PM',
    amount: 8900,
    status: 'Received',
  },
  {
    image: UserImg,
    name: 'Jackson Stewart',
    group: 'Ibadan Corp Members',
    date: '21/12/2023',
    time: '02:40:20 PM',
    amount: 9300,
    status: 'Sent',
  },
  {
    image: pic,
    name: 'Isabella Taylor',
    group: 'Lagos Corp Members',
    date: '28/05/2023',
    time: '04:30:45 PM',
    amount: 5200,
    status: 'Sent',
  },
]

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

function getCurrentDate(): string {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const formattedDay = day < 10 ? `0${day}` : `${day}`
  const formattedMonth = month < 10 ? `0${month}` : `${month}`

  return `${formattedDay}/${formattedMonth}/${year}`
}

function getYesterdayDate(): string {
  const currentDate = new Date()
  const yesterday = currentDate.getDate() - 1
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const formattedDay = yesterday < 10 ? `0${yesterday}` : `${yesterday}`
  const formattedMonth = month < 10 ? `0${month}` : `${month}`

  return `${formattedDay}/${formattedMonth}/${year}`
}

const todayTransactions = transData.filter((date) => {
  return date.date === getCurrentDate()
})

const yesterdayTransactions = transData.filter((date) => {
  return date.date === getYesterdayDate()
})

export const TodayResponsiveTable: React.FC = () => {
  return (
    <div>
      <div className={styles.allContainer}>
        <Text content="Today" level={5} />

        <div className={styles.container}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <tbody>
                {todayTransactions.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <img src="https://picsum.photos/200/300" alt={row.name} />
                    </td>
                    <td>
                      <Text content={row.name} size="Small" />
                    </td>

                    <td>
                      <Text content={row.group} size="Small" />
                    </td>
                    <td>
                      <Text content={row.date} size="Small" />
                    </td>
                    <td>
                      <Text content={row.time} size="Small" />
                    </td>
                    <td>
                      <Text content={formatNaira(row.amount)} size="Small" />
                    </td>

                    <td
                      className={styles['status-cell']}
                      data-status={row.status}
                    >
                      <Text content={row.status} color="none" size="Small" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export const YesterdayResponsiveTable: React.FC = () => {
  return (
    <div className={styles.allContainer}>
      <Text content="Yesterday" level={5} />

      <div className={styles.container}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <tbody>
              {yesterdayTransactions.map((row, index) => (
                <tr key={index}>
                  <td>
                    <img src="https://picsum.photos/200/300" alt={row.name} />
                  </td>
                  <td>
                    <Text content={row.name} size="Small" />
                  </td>

                  <td>
                    <Text content={row.group} size="Small" />
                  </td>
                  <td>
                    <Text content={row.date} size="Small" />
                  </td>
                  <td>
                    <Text content={row.time} size="Small" />
                  </td>
                  <td>
                    <Text content={formatNaira(row.amount)} size="Small" />
                  </td>
                  <td
                    className={styles['status-cell']}
                    data-status={row.status}
                  >
                    <Text content={row.status} color="none" size="Small" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
