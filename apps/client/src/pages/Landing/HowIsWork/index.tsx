import classNames from 'classnames'
import { Text } from 'components'
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
      <div>
        <Text
          color={'Primary'}
          size={'Subheading'}
          content={Header}
          className={styles.header}
        />
        <ul className={styles.list}>
          {data.map(({ id, description, title }) => (
            <li key={id} className={classNames(styles.listItem)}>
              <Text>{id}</Text>
              <div>
                <Text size={'Subtext'}>{title}</Text>
                <Text>{description}</Text>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <img src={frame} alt="" />
      </div>
    </div>
  )
}

export default HowIsWork
