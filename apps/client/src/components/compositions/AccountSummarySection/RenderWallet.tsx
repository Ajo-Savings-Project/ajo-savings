import { useForm } from 'react-hook-form'
import { ModalCard } from '../../compounds'
import { Button, Input, Text } from '../../elements'
import styles from './styles.module.scss'

export const RenderWallet = ({
  onClose,
  type,
}: {
  onClose: () => void
  type: string
}) => {
  const { handleSubmit } = useForm({})

  const submitData = () => {
    switch (type) {
      case 'global-deposit':
        break
      default:
        break
    }
  }

  return (
    <ModalCard className={styles.modalCard} onClick={onClose}>
      <Text
        content={'Access your Wallet'}
        size={'Subtext'}
        style={{ textAlign: 'center' }}
      />
      <form className={styles.cardForm} onSubmit={handleSubmit(submitData)}>
        <Input
          className={styles.infoCardDivInput}
          type={'text'}
          label={type === 'global-withdraw' ? 'Amount to withdraw' : 'Amount'}
          placeholder={'Type the amount'}
        />
        <Button style={{ width: '100%' }} type={'submit'} text={'Submit'} />
      </form>
    </ModalCard>
  )
}
