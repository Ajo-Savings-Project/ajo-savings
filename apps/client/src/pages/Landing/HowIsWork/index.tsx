import classNames from 'classnames'
import { Card, Text } from 'components'
import styles from './HowIsWork.module.scss'
import frame from './images/Frame.png'

const Header = 'How It Works'

const data = [
  {
    id: '1',
    title: 'Sign Up in Seconds',
    description: 'Create account with Ajó Savings and start saving.',
  },
  {
    id: '2',
    title: 'Join or Create Thrift Groups',
    description:
      'Create your account quickly and start your savings journey within moments.',
  },
  {
    id: '3',
    title: 'Automated Contributions',
    description:
      'Schedule automatic transfers from your wallet to your savings group for hassle-free saving.',
  },
  {
    id: '4',
    title: 'Track and Celebrate',
    description:
      'Monitor your savings growth, view contributions, and celebrate milestones on our user-friendly dashboard.',
  },
]

const HowIsWork = () => {
  return (
    <div className={classNames('container', styles.section)}>
      <div className={styles.content}>
        <Text
          style={{ color: 'var(--primary-600)' }}
          size={'Subheading'}
          content={Header}
          className={styles.header}
        />
        {data.map((item, index) => (
          <Card className={styles.card} key={index}>
            <div className={styles.cardGrid}>
              <div className={styles.circleWrapper}>
                <div className={styles.cardCircle}></div>
                <Text
                  size={'Label'}
                  className={styles.cardId}
                  content={item.id}
                />
              </div>
              <Text
                size={'Label'}
                className={styles.cardTitle}
                content={item.title}
              />
            </div>
            <Text
              className={styles.cardText}
              size={'Small'}
              content={item.description}
            />
          </Card>
        ))}
      </div>
      <div className={styles.image}>
        <img src={frame} alt="frame for How It Works" />
      </div>
    </div>
  )
}

export default HowIsWork
