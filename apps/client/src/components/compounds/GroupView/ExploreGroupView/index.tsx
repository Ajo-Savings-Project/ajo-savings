import { Button, Text } from 'components'
import styles from './exploreGroup.module.scss'
import Chevron from './images/cheveron-right.svg?react'
import TableComponent from '../GroupTable'
import CardComponent from '../GroupCard'

const ExploreGroupView = () => (
  <div className={styles.container}>
    <div className={styles.Header}>
      <div className={styles.HeaderLeft}>
        <Text
          content="Lagos Corp Members"
          size="Label"
          style={{ marginBottom: '12px', marginTop: '24px' }}
          className={styles.topic}
        />

        <div className={styles.flex}>
          <div className={styles.data}>
            <div className={styles.left}>
              <Text content="Active Savings Group" size="Small" />
              <Chevron />
            </div>
            <div className={styles.right}>
              <Text content="Active Savings Group" size="Small" />
              <Chevron />
              <Text content="Lagos Corp Members" size="Small" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.HeaderJoin}>
        <Button text="Join" />
      </div>
    </div>
    <div className={styles.containerMiddle}>
      <img
        src="https://picsum.photos/200/300.webp?random=idx"
        alt=""
        style={{ width: '100%', height: '250px' }}
      />
      <Text
        className={styles.text}
        content="Bros/Sis, no dull yourself for dis service year money mata. Join Lagos Corp Members Thrift Saving Group sharp-sharp! We go secure your money, make am grow well-well, and support each other for dis money journey. Learn money sense, plan for your future, and enjoy the benefits of our community. No time to waste, come join us now! Contact [07067482633]. Make we flex our money together!"
      />
    </div>
    <div className={styles.containerLastly}>
      <CardComponent />
      <TableComponent />
    </div>
  </div>
)

export default ExploreGroupView
