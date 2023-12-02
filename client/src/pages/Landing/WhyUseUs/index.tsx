import styles from './whyUseUs.module.scss'
import { Card, Text } from 'components'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import arrow from './images/Arrow.png'
import user from './images/users.png'
import withdraw from './images/money-withdrawal.png'
import sheild from './images/shield-alt.png'
import wallet from './images/wallet-alt.png'

const data = [
  {
    icon: user,
    title: 'Join Thrift Groups',
    text: 'Save collectively with rotating lump sum payouts, eliminating risks of traditional methods.',
  },
  {
    icon: withdraw,
    title: 'Hassle-Free Cashouts',
    text: 'Enjoy rotating lump sum payouts, ensuring fair distribution among group members.',
  },
  {
    icon: sheild,
    title: 'Secure and Convenient',
    text: 'Enjoy peace of mind with robust security measures and user-friendly wallet managem',
  },
  {
    icon: wallet,
    title: 'Easy Wallet Management',
    text: 'Seamlessly manage your funds, add money, and withdraw when you need it.',
  },
]

const WhyUseUs = () => {
  return (
    <div className={classNames('container', styles.gridBox)}>
      {data.map((item, index) => (
        <Card className={styles.card} key={index}>
          <img src={item.icon} alt="icons" />
          <Text
            size={'Label'}
            className={styles.cardTitle}
            content={item.title}
          />
          <Text
            className={styles.cardText}
            size={'Small'}
            content={item.text}
          />
          <Link style={{ textDecoration: 'none' }} to="">
            <span className={styles.learnMore}>
              <Text
                style={{ color: 'var(--primary-600)', textDecoration: 'none' }}
                content={'Learn more'}
              />
              <img src={arrow} alt="learn more" />
            </span>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default WhyUseUs
