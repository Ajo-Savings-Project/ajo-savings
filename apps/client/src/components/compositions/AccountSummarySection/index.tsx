import { useEffect, useState } from 'react'
import { GlobalWallet } from './GlobalWallet.tsx'
import { OtherWallet } from './OtherWallets.tsx'
import { useQueryWallets } from './request.ts'
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
  useQueryWallets() // api logic

  // to be replaced
  const [amounts, setAmounts] = useState({
    'global-bal': { balance: '--', id: '' },
    'group-savings': { balance: '--', id: '' },
    'personal-savings': { balance: '--', id: '' },
    'save-lock': { balance: '--', id: '' },
  })

  useEffect(() => {
    setTimeout(() => {
      setAmounts({
        'global-bal': { balance: '₦ 130,000.00', id: '' },
        'group-savings': { balance: '₦ 1,000.00', id: '' },
        'personal-savings': { balance: '₦ 900,000.00', id: '' },
        'save-lock': { balance: '₦ 500,000.00', id: '' },
      })
    }, 5000)
  }, [])

  return (
    <section id="account summary" className={styles.accountSummary}>
      <GlobalWallet amount={amounts['global-bal'].balance} />
      {otherWalletData.map(({ name, ...props }) => (
        <OtherWallet
          key={name}
          {...props}
          name={name}
          amount={amounts[name as keyof typeof amounts].balance}
        />
      ))}
    </section>
  )
}

export default AccountSummarySection
