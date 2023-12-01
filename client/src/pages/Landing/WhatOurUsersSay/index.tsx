import { Text } from 'components'
import Aderemi_pic from '../../../assets/svg/Aderemi.svg'
import styles from './WhatOurUsersSay.module.scss'
import polygon from './../../../assets/svg/Polygon1.svg'

const WhatOurUsersSay = () => {

    const user_feedback = [
        {
            name: 'Aderemirekun Ayomide',
            group: 'Widower Association',
            picture: Aderemi_pic,
            feedback: '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"'
        },
        {
            name: 'Aderemirekun Ayomide',
            group: 'Widower Association',
            picture: Aderemi_pic,
            feedback: '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"'
        },
        {
            name: 'Aderemirekun Ayomide',
            group: 'Widower Association',
            picture: Aderemi_pic,
            feedback: '"Ajo Money has transformed the way I save money. Being part of a thrift group has made it easier to stay motivated and accountable. With Ajó Savings, I\'ve achieved my savings goals faster than ever before!"'
        },
    ]

    return (
        <section className={styles.feedback_container}>
            <Text
                content='What our users say?'
                size={'Subheading'}
                font={'Inter'}
                color={'Primary'}
                className={styles.what_users_say}
            />
            <div className={styles.clearfix}>
                {user_feedback.map((feed, key) => {
                    return (
                        <div key={key} className={styles.single_feedback_container}>
                            <div style={{ position: 'relative' }}>
                                <Text content={feed.feedback} font={'Inter'} className={styles.single_feedback} />
                                <img className={styles.polygon} src={polygon} alt="" />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <img src={feed.picture} alt={feed.name} />
                                <div>
                                    <Text content={feed.name} />
                                    <Text content={feed.group}
                                        style={{ color: '#667085' }}
                                    // color={'Gray'}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default WhatOurUsersSay