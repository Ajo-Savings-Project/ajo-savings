import classNames from 'classnames'
import { createElement, HTMLAttributes, PropsWithChildren } from 'react'
import styles from './typography.module.scss'

interface TypographyProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'content'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  content?: string
}
const Typography = ({
  level,
  content,
  children,
  ...props
}: PropsWithChildren<TypographyProps>) => {
  return createElement(
    level ? `h${level}` : 'p',
    { ...props, className: classNames(styles.text) },
    content || children
  )
}

export default Typography
