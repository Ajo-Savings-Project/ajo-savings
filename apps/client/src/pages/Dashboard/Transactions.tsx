import { Text } from 'components'
import { TransactionsTable } from '../../components/compounds/TransactionDetails/ResponsiveTable'

const TransactionsPage = () => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text content="Transactions" size="Subtext" />
        <div style={{ color: '#2F80ED' }}>
        </div>
      </div>
      <TransactionsTable />
    </div>
  )
}

export default TransactionsPage
