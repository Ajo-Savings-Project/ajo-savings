import SavingsTargetCard from 'components/compounds/SavingsTargetCard'
import SavingsHeader from 'components/compounds/SavingsHeader'

const SavingsPage = () => {
  return (
    <div>
      <SavingsHeader />
      <div>
        <SavingsTargetCard
          img="https://picsum.photos/200/300"
          title={'Travel'}
          description={'Trip to Bali'}
          savedAmount={5000000}
          totalAmount={10000000}
        />
      </div>
    </div>
  )
}

export default SavingsPage
