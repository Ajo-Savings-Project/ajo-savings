import { Button, Text } from 'components'
import styles from './monthContribute.module.scss'
import { createRandomContribute } from './mockData.ts'

const { date, month, amount } = createRandomContribute()

const MonthContribute = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.row}>
          <Text
            content={`${month} CONTRIBUTION`}
            size="Small"
            className={styles.topic}
          />
          <Text content={date} size="Small" className={styles.date} />
          <Text content={`${amount}.`} size="Small" className={styles.amount} />
          <Text
            content="Your payment will be debited from your "
            size="Small"
            className={styles.date}
          />
          <Text
            content={`WALLET ${amount}.`}
            size="Small"
            className={styles.wallet}
          />
        </div>
        <div className={styles.layoutButton}>
          <Button text="Pay now" />
          <Button text="Dismss" className={styles.dismiss} />
        </div>
      </div>
    </div>
  )
}

export default MonthContribute
