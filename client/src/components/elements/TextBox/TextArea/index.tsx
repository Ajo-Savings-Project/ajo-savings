import { TextareaHTMLAttributes } from 'react'
import styles from './textarea.module.scss'
import classNames from 'classnames'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const Textarea = ({ label, ...props }: TextareaProps) => {
  return (
    <div className={styles.inputContainer}>
      <label
        className={styles.inputContainerLabel}
        htmlFor={props.id || label || props.name}
      >
        {label}
      </label>
      <textarea
        {...props}
        id={props.id || label || props.name}
        className={classNames(styles.inputContainerInput, styles.textarea)}
      />
    </div>
  )
}

export default Textarea
