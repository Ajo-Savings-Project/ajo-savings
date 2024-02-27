import { Modal } from '../../compounds'
import { Card, Text } from '../../elements'
import { CardButton } from './Button.tsx'
import { RenderWallet } from './RenderWallet.tsx'
import AcctBal from './assets/account_balance_wallet.svg?react'
import styles from './styles.module.scss'

export const GlobalWallet = ({ amount }: { amount: string }) => {
  return (
    <Card className={styles.globalWallet}>
      <AcctBal />
      <Text size={'Small'} color={'Inherit'} content={'Global Wallet'} />
      <Text
        color={'Inherit'}
        content={String(amount || '__')}
        size={'Subtext'}
      />
      <div className={'row-between'}>
        <Modal
          modalContentClassName={styles.modalContent}
          disableOutsideClose
          renderOnOpen={({ onOpen }) => (
            <CardButton onClick={onOpen} text={'Deposit'} />
          )}
          renderModalContent={({ onClose }) => (
            <RenderWallet type={'global-deposit'} onClose={onClose} />
          )}
        />
        <Modal
          disableOutsideClose
          modalContentClassName={styles.modalContent}
          renderOnOpen={({ onOpen }) => (
            <CardButton secondary onClick={onOpen} text={'Withdraw'} />
          )}
          renderModalContent={({ onClose }) => (
            <RenderWallet type={'global-withdraw'} onClose={onClose} />
          )}
        />
      </div>
    </Card>
  )
}
