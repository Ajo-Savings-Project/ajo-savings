import { Text } from 'components'
import { TransactionsTable } from 'components/compounds/TransactionDetails/ResponsiveTable'

const TransactionsPage = () => {
  return (
    <div style={{ maxWidth: '1000px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text content="Transactions" size="Subtext" />
        <div style={{ color: '#2F80ED' }}>
          <Text content="Clear all" color="none" size="Small" />
        </div>
      </div>
      <TransactionsTable />
    </div>
  )
}

export default TransactionsPage
