import { Modal, Text } from 'components'
import styles from './fixMyGoal.module.scss'
import SetTarget from '../SetTarget'
import ForwardIcon from './Icons/ForwardIcon.svg?react'
// import Fund from './Icons/Fund.svg?react'
// import Withdraw from './Icons/Withdraw.svg?react'
import { CardButton } from 'components/compositions/AccountSummarySection/Button'
import { RenderWallet } from 'components/compositions/AccountSummarySection/RenderWallet'

const FixMyGoal = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.ContainerGoalsHeader}>
        <div className={styles.ContainerGoalsHeaderOne}>
          <Text
            content={'My Goal'}
            size={'Small'}
            style={{ color: '#98a2b3' }}
          />
          <ForwardIcon />
          <Text
            content={'Trip to Bali'}
            size={'Small'}
            style={{ fontWeight: 'bold' }}
          />
        </div>
        <div className={styles.ContainerGoalsHeaderTwo}>
          <Text
            content={'Trip to Bali'}
            size={'Subtext'}
            style={{ fontWeight: 'bold' }}
          />
          <Modal
            modalContentClassName={styles.modalContent}
            disableOutsideClose
            renderOnOpen={({ onOpen }) => (
              <button className={'link clear-button'} onClick={onOpen}>
                Add New Goal
              </button>
            )}
            renderModalContent={({ onClose }) => (
              <SetTarget onClose={onClose} />
            )}
          />
        </div>
      </div>
      <div className={styles.ContainerMainContent}>
        <div className={styles.ContainerMainContentUp}>
          <div>
            <Text content={'Amount Saved'} size={'Small'} />
            <Text
              content={'#200,000'}
              size={'Subtext'}
              style={{ fontWeight: 'bold' }}
            />
          </div>
          <div>
            <Text content={'Total Target'} size={'Small'} />
            <Text
              content={'₦1,000,000'}
              size={'Subtext'}
              style={{ fontWeight: 'bold' }}
            />
          </div>
          <div>
            <Text content={'Days Left'} size={'Small'} />
            <Text
              content={'205 Days'}
              size={'Subtext'}
              style={{ fontWeight: 'bold' }}
            />
          </div>
        </div>
        {/* <div>
                    <div>
                        <Fund className={styles.ContainerMainContentSvg} />
                        <Button text='Fund Target' type='submit' />
                    </div>
                    <div>
                        <Withdraw className={styles.ContainerMainContentSvg} />
                        <Button text='Withdraw to Wallet' type='submit' >
                            <Withdraw />
                            <p>hiii</p>
                        </Button>
                    </div>
                </div> */}
        <div className={styles.ContainerMainContentDown}>
          <Modal
            modalContentClassName={styles.modalContent}
            disableOutsideClose
            renderOnOpen={({ onOpen }) => (
              <CardButton
                onClick={onOpen}
                kindOfButton="default"
                other
                text={'Fund Target'}
              />
            )}
            renderModalContent={({ onClose }) => (
              <RenderWallet type={'global-deposit'} onClose={onClose} />
            )}
          />
          <Modal
            disableOutsideClose
            modalContentClassName={styles.modalContent}
            renderOnOpen={({ onOpen }) => (
              <CardButton
                secondary
                onClick={onOpen}
                kindOfButton="default"
                text={'Withdraw to Wallet'}
              />
            )}
            renderModalContent={({ onClose }) => (
              <RenderWallet type={'global-withdraw'} onClose={onClose} />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default FixMyGoal
