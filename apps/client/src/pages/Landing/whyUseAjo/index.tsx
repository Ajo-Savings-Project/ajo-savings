import styles from './whyUseAjo.module.scss'
import { Card, Text } from 'components'
import classNames from 'classnames'
import exchange from './images/exchange.png'
import notification from './images/Notification.png'
import wallet from './images/Wallet.png'

const data = [
  {
    icon: exchange,
    title: 'ontribution Analytics',
    text: 'Admins gain valuable insights into group contributions and track member participation',
  },
  {
    icon: wallet,
    title: 'Wallet Integration',
    text: 'Add funds to your wallet easily using various payment methods and withdraw securely.',
  },
  {
    icon: notification,
    title: 'Notifications and Reminders',
    text: 'Stay informed about group activities, cashouts, and important updates.',
  },
]
const Header = 'Why use Ajo?'

const WhyUseAjo = () => {
  return (
    <>
      <Text
        style={{ color: 'var(--primary-600)' }}
        size={'Subheading'}
        content={Header}
        className={styles.header}
      />
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
          </Card>
        ))}
      </div>
    </>
  )
}

export default WhyUseAjo
