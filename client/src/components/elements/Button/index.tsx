import classNames from 'classnames'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  kind?: 'rounded' | 'default'
}

const Button = ({
  text,
  children,
  kind = 'default',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={props.type ?? 'button'}
      className={classNames(styles.button, {
        [styles.buttonRounded]: kind === 'rounded',
      })}
      {...props}
    >
      {text || children}
    </button>
  )
}

export default Button
