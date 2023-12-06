import { forwardRef, TextareaHTMLAttributes } from 'react'
import styles from './textarea.module.scss'
import classNames from 'classnames'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label
          className={styles.inputContainerLabel}
          htmlFor={props.id || label || props.name}
        >
          {label}
        </label>
        <textarea
          ref={ref}
          {...props}
          id={props.id || label || props.name}
          className={classNames(
            styles.inputContainerInput,
            styles.textarea,
            props.className
          )}
        />
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
