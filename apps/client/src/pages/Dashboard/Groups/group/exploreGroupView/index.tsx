import { Button, Text } from 'components'
import styles from './exploreGroup.module.scss'
import frame from './images/Frame.svg'
import rightless from './images/rightless.svg'
import TableComponent from '../Table'
import CardComponent from '../GroupCard'
// import TableComponent from '../table/TableComponent'

const textArray = [
  'Bros/Sis, no dull yourself for dis service year money mata Join Lagos Corp Members Thrift Saving Group sharp-sharp!We go secure your money, make am grow well-well, and support each other for dis money journey.Learn money sense, plan for your future, and enjoy the benefits of our community. No time to waste, come join us now! Contact [07067482633].Make we flex our money together!',
]

const cardData = [
  {
    label1: 'Contribution Amount',
    value1: '₦ 500,000',
    label2: 'Schedule',
    value2: 'Daily',
  },
  {
    label1: 'Contribution Timeline',
    value1: '5 months',
    label2: 'Estimated Collection',
    value2: '₦ 2,000,000',
  },
  {
    label1: 'Start Date',
    value1: 'May 1, 2022',
    label2: 'End Date',
    value2: 'October 1, 2022',
  },
  {
    label1: 'Available Slots',
    value1: '2 and 6',
    label2: 'Total Slots',
    value2: '6',
  },
]

const data = [
  { slot: 'slot', name: 'name', performance: 'performance' },
  { slot: '1', name: 'Oluwatomilola Eze', performance: '90.23%' },
  { slot: '2', name: 'Mohammed Adebayo', performance: '45.50%' },
  { slot: '3', name: 'Oluwadamilare Idowu', performance: '90.23%' },
  { slot: '4', name: 'Harry Smith', performance: 'New user' },
]

const ExploreGroupView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerFirst}>
        <div className={styles.heading}>
          <Text
            content={'Lagos Corp Members'}
            size={'Heading'}
            className={styles.head}
          />
          <div className={styles.sub}>
            <div className={styles.subOne}>
              <Text content={'Active Savings Group'} size={'Small'} />
              <img src={rightless} alt="" />
            </div>
            <div className={styles.arrow}>
              <div className={styles.arrowOne}>
                <Text content={'Explore Savings Group'} size={'Small'} />
                <img src={rightless} alt="" />
              </div>
              <div className={styles.arrowTwo}>
                <Text
                  content={'Lagos Corp Members'}
                  size={'Small'}
                  style={{ color: 'var(--gray-500)' }}
                />
                <img src={rightless} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            type={'submit'}
            text={'Join'}
            style={{ margin: '10px 0 0 0' }}
          />
        </div>
      </div>

      <div className={styles.containerMiddle}>
        <img src={frame} alt="" className={styles.image} />
        {textArray.map((text, index) => (
          <Text
            key={index}
            content={text}
            size={'Small'}
            className={styles.text}
          />
        ))}
      </div>

      <div className={styles.containerLastly}>
        <CardComponent cardData={cardData} />

        <TableComponent data={data} />
      </div>
    </div>
  )
}

export default ExploreGroupView
