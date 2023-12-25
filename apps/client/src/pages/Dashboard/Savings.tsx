import SavingsTargetCard from 'components/compounds/SavingsTargetCard'
import travelImg from './../../components/compounds/SavingsTargetCard/Images/Travel_Img.svg'

const SavingsPage = () => {
  return (
    <div>
      Savings Page
      <div>
        <SavingsTargetCard
          img={travelImg}
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
