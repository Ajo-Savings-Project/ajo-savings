import classNames from 'classnames'
import { createElement, HTMLAttributes, PropsWithChildren } from 'react'
import styles from './typography.module.scss'

interface TypographyProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'content'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  content?: string
  font?: 'Bodoni' | 'Inter'
  size?:
    | 'Default'
    | 'Heading'
    | 'Subheading'
    | 'Subtext'
    | 'Label'
    | 'Small'
}
const Typography = ({
  level,
  content,
  children,
  size,
  font = 'Inter',
  ...props
}: PropsWithChildren<TypographyProps>) => {
  return createElement(
    level ? `h${level}` : 'p',
    {
      ...props,
      className: classNames(
        styles.text,
        styles[`textFont${font}`],
        typeof size === 'string' && { [styles[`textSize${size}`]]: size },
        props.className
      ),
    },
    content || children
  )
}

export default Typography
