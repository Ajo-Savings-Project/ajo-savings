import { Card, Text } from 'components'
import AjoCorperImg from './Image/AjoCorperImg.svg'
import styles from './upcomingActivities.module.scss'

const activities = [
  {
    id: 1,
    img: AjoCorperImg,
    title: 'Contribution to Lagos Corp Group',
    date: 'May 29, 2023 at 11:30 AM',
    amount: -5000,
  },
  {
    id: 2,
    img: AjoCorperImg,
    title: 'Contribution to Lagos Corp Group',
    date: 'May 29, 2023 at 11:30 AM',
    amount: 5000,
  },
  {
    id: 3,
    img: AjoCorperImg,
    title: 'Contribution to Lagos Corp Group',
    date: 'May 29, 2023 at 11:30 AM',
    amount: 5000,
  },
]

function formatCurrency(input: number): string {
  const formattedCurrency = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Math.abs(input))

  if (input < 0) {
    return `-${formattedCurrency}`
  }

  return `${formattedCurrency}`
}

const UpcomingActivities = () => {
  return (
    <Card className={styles.layout}>
      <div className={styles.layoutHeader}>
        <Text content={'UPCOMING ACTIVITIES'} size={'Small'} />
        <Text
          content={'View all'}
          size={'Small'}
          style={{ color: 'var(--dashboard-blue1)' }}
        />
      </div>
      {activities.map((activity, index) => {
        const { img, title, date, amount } = activity
        return (
          <div key={index} className={styles.layoutAllcard}>
            <div className={styles.layoutLeftcard}>
              <img src={img} alt={title} />
              <div>
                <Text content={title} size={'Small'} />
                <Text content={date} size={'Small'} color={'Gray'} />
              </div>
            </div>
            <Text
              style={{
                whiteSpace: 'nowrap',
                color:
                  amount < 1 ? 'var(--primary-500)' : 'var(--Main-primary)',
              }}
              content={formatCurrency(amount)}
              size={'Small'}
            />
          </div>
        )
      })}
    </Card>
  )
}

export default UpcomingActivities
