import SavingsTargetCard from 'components/compounds/SavingsTargetCard'

const SavingsPage = () => {
  return (
    <div>
      Savings Page
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
