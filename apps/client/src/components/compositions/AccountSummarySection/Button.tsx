import classNames from 'classnames'
import { Button, Text } from '../../elements'
import styles from './styles.module.scss'
import Plus from './assets/Add+sign.svg?react'
import SendIcon from './assets/Sendsend.svg?react'
interface BtnI {
  text: string
  onClick: () => void
  secondary?: boolean
}

export const CardButton = ({ text, onClick, secondary }: BtnI) => {
  return (
    <Button
      className={classNames(styles.button, {
        [styles.buttonSecondary]: secondary,
      })}
      onClick={onClick}
      kind={'rounded'}
    >
      {secondary ? <SendIcon /> : <Plus className={styles.plus} />}
      <Text content={text} />
    </Button>
  )
}
