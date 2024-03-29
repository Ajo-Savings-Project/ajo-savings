import { Text } from 'components'
import styles from './memberTransaction.module.scss'
import { createRandomTransact } from './mockData'

const transactions = Array.from({ length: 10 }, createRandomTransact)

const MemberTransaction = () => {
  return (
    <div className={styles.container}>
      <Text content="Transactions History" />

      <div className={styles.containerTran}>
        {transactions.map((data, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.ImageAndDate}>
              <img
                src={data.avatar.replace('idx', `${index}`)}
                alt=""
                className={styles.Image}
              />

              <div>
                <Text content={data.date} />
                <Text>at {data.time}</Text>
              </div>
            </div>

            <div className={styles.amount}>
              <Text content="Amount" className={styles.hide} />
              <Text content={data.amount} style={{ color: data.amountColor }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MemberTransaction

// import { Text } from "components"
// import styles from './memberTransaction.module.scss'
// import { transData } from "./mockData"
// import { getFormattedDate, getFormattedTime, mockTransactions } from "./helper"

// const transactions = mockTransactions(transData)

// const MemberTransaction = () => {
//     return (
//         <div className={styles.container}>
//             <Text content="Transactions History" />

//             <div className={styles.containerTran}>
//             {
//                 transactions.map((data, index) => (
//                     <div className={styles.row} key={index}>
//                         <div className={styles.ImageAndDate}>
//                             <img src={data.avatar.replace(
//                         'idx',
//                         `${index}`
//                       )} alt=""  className={styles.Image}/>

//                          <div>
//                             <Text content={getFormattedDate(data.date)} />
//                             <Text>
//                                 at { getFormattedTime(data.date)}
//                             </Text>

//                         </div>
//                       </div>

//                         <div className={styles.amount}>
//                             <Text content="Amount" className={styles.hide}/>
//                             <Text content={data.amount as string} />
//                         </div>

//                     </div>
//                 ))
//             }

//         </div>
//         </div>

//     )
// }

// export default MemberTransaction
