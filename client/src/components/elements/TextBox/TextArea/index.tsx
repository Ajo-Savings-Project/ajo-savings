import { ChangeEvent, TextareaHTMLAttributes, useState } from 'react'
import styles from './textarea.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

interface TextareaState {
  textValue: string
}

// eslint-disable-next-line react/prop-types
const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  const [state, setState] = useState<TextareaState>({
    textValue: '',
  })

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({
      ...prev,
      textValue: event.target.value,
    }))
  }

  return (
    <div className={styles.container}>
      <label className={styles.Label} htmlFor="textarea">
        {label}:
      </label>
      <textarea
        id="textarea"
        className={styles.Textarea}
        value={state.textValue}
        onChange={handleTextareaChange}
        {...props}
      />
      <p>Current Value: {state.textValue}</p>
    </div>
  )
}

export default Textarea
