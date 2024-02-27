import classNames from 'classnames'
import { FunctionComponent, SVGProps } from 'react'
import { Modal } from '../../compounds'
import { Card, Text } from '../../elements'
import { CardButton } from './Button.tsx'
import { RenderWallet } from './RenderWallet.tsx'
import styles from './styles.module.scss'
interface OtherWalletI {
  Icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >
  amount: string
  label: string
  name: string
}

export const OtherWallet = ({
  Icon,
  amount,
  label,
  name: type,
}: OtherWalletI) => {
  return (
    <Card className={classNames(styles.globalWallet, styles.otherWallet)}>
      <Icon />
      <Text size={'Small'} content={label} />
      <Text content={String(amount || '__')} size={'Subtext'} />
      <Modal
        modalContentClassName={styles.modalContent}
        disableOutsideClose
        renderOnOpen={({ onOpen }) => (
          <CardButton onClick={onOpen} text={'Deposit'} />
        )}
        renderModalContent={({ onClose }) => (
          <RenderWallet type={type} onClose={onClose} />
        )}
      />
    </Card>
  )
}
