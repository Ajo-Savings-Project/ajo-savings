import { Text } from 'components'
import styles from './WhatOurUsersSay.module.scss'
import polygon from './svg/Polygon1.svg'
import Aderemi_pic from './svg/Aderemi.svg'

const userFeedback = [
  {
    name: 'Aderemirekun Ayomide',
    group: 'Widower Association',
    picture: Aderemi_pic,
    feedback:
      '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"',
  },
  {
    name: 'Aderemirekun Ayomide',
    group: 'Widower Association',
    picture: Aderemi_pic,
    feedback:
      '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"',
  },
  {
    name: 'Aderemirekun Ayomide',
    group: 'Widower Association',
    picture: Aderemi_pic,
    feedback:
      '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"',
  },
]

const WhatOurUsersSay = () => {
  return (
    <section className={styles.feedbackContainer}>
      <div className="container">
        <Text
          content="What our users say?"
          size={'Subheading'}
          color={'Primary'}
          className={styles.whatUsersSay}
        />
        <div className={styles.singleFeedbackContainer}>
          {userFeedback.map((feed, key) => {
            return (
              <div key={key}>
                <div style={{ position: 'relative' }}>
                  <Text
                    content={feed.feedback}
                    className={styles.singleFeedback}
                  />
                  <img className={styles.polygon} src={polygon} alt="" />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <img src={feed.picture} alt={feed.name} />
                  <div>
                    <Text content={feed.name} />
                    <Text content={feed.group} color={'Gray'} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatOurUsersSay
