import { Button, Text } from 'components'
import styles from './activeGroup.module.scss'
import ContributionOverview from '../components/ContributionOverview'
import { IoChevronForward } from 'react-icons/io5'
import MonthContribute from '../components/MonthContribution'
import MemberTransaction from '../components/MemberTransaction'

const ActiveGroup = () => {
  const isMember = true

  return (
    <div className={styles.container}>
      <div className={styles.Header}>
        <div className={styles.Heading}>
          <div className={styles.HeaderLeft}>
            <Text
              content="Lagos Corp Members"
              size="Subtext"
              className={styles.topic}
            />

            <div className={styles.flex}>
              <Text content="Active Savings Group" size="Small" />
              <IoChevronForward />
              <Text content="Lagos Corp Members" size="Small" />
            </div>
          </div>
          <MonthContribute />
        </div>

        <div className={styles.HeaderJoin}>
          {isMember ? <></> : <Button text="Join" />}
        </div>
      </div>
      <div className={styles.containerMiddle}>
        <img
          src="https://picsum.photos/200/300.webp?random=idx"
          alt=""
          style={{ width: '100%', height: '250px' }}
        />
        <Text className={styles.text}>
          Bros/Sis, no dull yourself for dis service year money mata. Join Lagos
          Corp Members Thrift Saving Group sharp-sharp! We go secure your money,
          make am grow well-well, and support each other for dis money journey.
          Learn money sense, plan for your future, and enjoy the benefits of our
          community. No time to waste, come join us now! Contact [07067482633].
          Make we flex our money together!
        </Text>
      </div>
      <div className={styles.containerLastly}>
        {isMember && <ContributionOverview isMember={isMember} />}
        <MemberTransaction />
      </div>
    </div>
  )
}

export default ActiveGroup
