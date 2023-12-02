import styles from './why_use_us.module.scss'
import { Card } from 'components'
import { Text } from 'components'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import arrow from './Arrow.png'
import { data } from './data'

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
