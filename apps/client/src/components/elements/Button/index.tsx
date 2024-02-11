import classNames from 'classnames'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import styles from './button.module.scss'
import LoadingIcon from '../../../assets/loading.svg?react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  kind?: 'rounded' | 'default'
  isLoading?: boolean
}

const Button = ({
  text,
  children,
  kind = 'default',
  isLoading,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={classNames(
        styles.button,
        {
          [styles.buttonRounded]: kind === 'rounded',
          [styles.buttonIsLoading]: isLoading,
        },
        props.className
      )}
      onClick={isLoading ? undefined : props.onClick}
    >
      {isLoading && <LoadingIcon />}
      {text || children}
    </button>
  )
}

export default Button
