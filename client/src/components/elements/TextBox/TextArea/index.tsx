import { TextareaHTMLAttributes } from 'react'
import styles from './textarea.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

const TextArea = ({ label, ...props }: TextareaProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.Label} htmlFor="textarea">
        {label}
      </label>
      <textarea {...props} className={styles.textarea} />
    </div>
  )
}

export default TextArea
