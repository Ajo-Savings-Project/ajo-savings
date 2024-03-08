import { GlobalWallet } from './GlobalWallet.tsx'
import { OtherWallet } from './OtherWallets.tsx'
import { useQueryWallets, ResponseType } from './request.ts'
import styles from './styles.module.scss'
import Group from './assets/group.svg?react'
import Profile from './assets/profile.svg?react'
import Eye from './assets/hide.svg?react'

import 'react-loading-skeleton/dist/skeleton.css'
import { formatCurrency } from 'utils/currencyFormatter.ts'

const otherWalletData = [
  {
    Icon: Group,
    name: 'group-savings',
    label: 'Total Group Savings',
  },
  {
    Icon: Profile,
    name: 'personal-savings',
    label: 'Total Personal Savings',
  },
  {
    Icon: Eye,
    name: 'save-lock',
    label: 'Save Lock',
  },
]

export const AccountSummarySection = () => {
  const { data, isLoading } = useQueryWallets()
  console.log(data)

  return (
    <section id="account summary" className={styles.accountSummary}>
      {}

      <GlobalWallet
        amount={
          isLoading ? '- - -' : formatCurrency(data?.data?.GLOBAL?.balance || 0)
        }
      />

      {otherWalletData.map(({ name, ...props }) => (
        <OtherWallet
          key={name}
          {...props}
          name={name}
          amount={
            isLoading
              ? '- - -'
              : formatCurrency(
                  data?.data[name as keyof ResponseType]?.balance || 0
                )
          }
        />
      ))}
    </section>
  )
}
export default AccountSummarySection
