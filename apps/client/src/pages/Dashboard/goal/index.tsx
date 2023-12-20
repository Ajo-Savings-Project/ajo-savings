import { Link } from 'react-router-dom'
import Travel from './images/travel.svg'
import Home from './images/home.svg'
import Car from './images/car.svg'
import styles from './goal.module.scss'
import { Card, Text } from 'components'

export const data = [
  {
    id: '1',
    image: Travel,
    target: 'Travel',
    amount_saved: 5_000_000.0,
    target_amount: 10_000_000.0,
  },
  {
    id: '2',
    image: Home,
    target: 'Dream Home',
    amount_saved: 10_000_000.0,
    target_amount: 40_000_000.0,
  },
  {
    id: '3',
    image: Car,
    target: 'Dream Car',
    amount_saved: 1_000_000.0,
    target_amount: 5_000_000.0,
  },
]

const MyGoals = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerText}>MY GOALS</span>
        <Link to="/dashboard/savings" className={styles.View}>
          View all
        </Link>
      </div>
      {data.map((target, index) => (
        <Card key={index} className={styles.goalSection}>
          <div className={styles.infoSection}>
            <div className={styles.goal}>
              <img className={styles.image} alt="image" src={target.image} />
              <div className={styles.info}>
                <Text
                  size={'Small'}
                  className={styles.target}
                  content={target.target}
                />
                <div className={styles.amount}>
                  <Text
                    size={'Small'}
                    className={styles.saved}
                    content={new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(target.amount_saved)}
                  />
                  <Text
                    size={'Small'}
                    className={styles.targetAmount}
                    content={`/${new Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(target.target_amount)}`}
                  />
                </div>
              </div>
            </div>
            <div className={styles.percentage}>
              {Math.round(
                (parseFloat(
                  target.amount_saved
                    .toString()
                    .replace('₦', '')
                    .replace(',', '')
                ) /
                  parseFloat(
                    target.target_amount
                      .toString()
                      .replace('₦', '')
                      .replace(',', '')
                  )) *
                  100
              )}
              %
            </div>
          </div>
          <div className={styles.dashedLinesContainer}>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className={
                  index < 5 ? styles.dashedLine : styles.dashedLineLeft
                }
              ></div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default MyGoals
