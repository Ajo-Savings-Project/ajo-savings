import classNames from 'classnames'
import { HTMLAttributes } from 'react'
import styles from './card.module.scss'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = ({ children, ...props }: CardProps) => {
  return (
    <div className={classNames(styles.card)} {...props}>
      {children}
    </div>
  )
}

export default Card
