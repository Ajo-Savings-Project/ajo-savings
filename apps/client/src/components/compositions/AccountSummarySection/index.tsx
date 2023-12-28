import { useEffect, useState } from 'react'
import { GlobalWallet } from './GlobalWallet.tsx'
import { OtherWallet } from './OtherWallets.tsx'
import styles from './styles.module.scss'
import Group from './assets/group.svg?react'
import Profile from './assets/profile.svg?react'
import Eye from './assets/hide.svg?react'

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
  const [amounts, setAmounts] = useState({
    'global-bal': '--',
    'group-savings': '--',
    'personal-savings': '--',
    'save-lock': '--',
  })

  useEffect(() => {
    setTimeout(() => {
      setAmounts({
        'global-bal': '₦ 130,000.00',
        'group-savings': '₦ 1,000.00',
        'personal-savings': '₦ 900,000.00',
        'save-lock': '₦ 500,000.00',
      })
    }, 5000)
  }, [])

  return (
    <section id="account summary" className={styles.accountSummary}>
      <GlobalWallet amount={amounts['global-bal']} />
      {otherWalletData.map(({ name, ...props }) => (
        <OtherWallet
          key={name}
          {...props}
          name={name}
          amount={amounts[name as keyof typeof amounts]}
        />
      ))}
    </section>
  )
}

export default AccountSummarySection
