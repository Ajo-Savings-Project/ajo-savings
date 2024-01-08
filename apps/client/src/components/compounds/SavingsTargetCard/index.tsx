import { formatCurrency } from 'utils/currencyFormatter'
import styles from './savingsTarget.module.scss'
import { Text } from 'components'

interface SavingsI {
  img: string
  title: string
  description: string
  savedAmount: number
  totalAmount: number
}
const SavingsTargetCard = ({
  img,
  title,
  description,
  savedAmount,
  totalAmount,
}: SavingsI) => {
  return (
    <div className={styles.savingsContainer}>
      <div className={styles.savingsContainerTop}>
        <section>
          <img src={img} alt={description} />
          <div className={styles.savingsContainerTargetDetails}>
            <div className={styles.savingsContainerTitle}>
              <Text content={title} color="none" />
            </div>
            <Text content={description} size="Subtext" />
            <Text
              content={`${formatCurrency(savedAmount)} / ${formatCurrency(
                totalAmount
              )}`}
              level={4}
            />
          </div>
        </section>
        <Text
          content={`${(savedAmount / totalAmount) * 100}%`}
          size="Subtext"
        />
      </div>
      <div className={styles.savingsContainerProgressBar}>
        <div
          style={{ width: `${(savedAmount / totalAmount) * 100}%` }}
          className={styles.savingsContainerProgressBarContent}
        ></div>
      </div>
    </div>
  )
}

export default SavingsTargetCard
