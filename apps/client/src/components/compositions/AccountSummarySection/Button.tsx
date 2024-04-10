import classNames from 'classnames'
import { Button, Text } from '../../elements'
import styles from './styles.module.scss'
import Plus from './assets/Add+sign.svg?react'
import SendIcon from './assets/Sendsend.svg?react'
import { HTMLAttributes } from 'react'

interface BtnI extends HTMLAttributes<HTMLElement> {
  text: string
  onClick: () => void
  secondary?: boolean
  other?: boolean
  kindOfButton?: 'rounded' | 'default'
}

export const CardButton = ({
  text,
  onClick,
  secondary,
  kindOfButton,
  other,
}: BtnI) => {
  return (
    <Button
      className={classNames(styles.button, {
        [styles.buttonSecondary]: secondary,
        [styles.buttonOther]: other,
      })}
      onClick={onClick}
      kind={kindOfButton}
    >
      {secondary ? (
        <SendIcon />
      ) : (
        <Plus
          className={styles.plus}
          style={{ background: (other && 'green') || '', color: 'yellow' }}
        />
      )}
      <Text style={{ color: other ? 'blue' : '#fff' }} content={text} />
    </Button>
  )
}
