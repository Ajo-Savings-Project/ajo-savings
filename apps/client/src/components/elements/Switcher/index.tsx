import styles from './switcher.module.scss'
import { useState, useRef } from 'react'
import classNames from 'classnames'

interface SwitcherProps {
  name?: string
  onChange: (checked: boolean, e?: HTMLInputElement) => void
  value?: boolean
  disabled?: boolean
}

const Switcher = ({ onChange, value, name, disabled }: SwitcherProps) => {
  const [checked, setIsChecked] = useState(value || false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleToggle = () => {
    if (inputRef.current) {
      setIsChecked(!inputRef.current.checked)
      if (onChange) onChange(checked, inputRef.current)
    }
  }

  return (
    <div
      className={classNames(styles.switcherWrapper, {
        [styles.switcherWrapperButtonOff]: checked,
      })}
    >
      <button
        onClick={handleToggle}
        className={classNames(styles.switcherWrapperButton, {
          [styles.switcherWrapperButtonOn]: checked,
        })}
        disabled={disabled}
      />
      <input
        ref={inputRef}
        id={name}
        name={name}
        className={styles.switcherWrapperInput}
        checked={checked}
        value={checked.toString()}
        type="checkbox"
      />
    </div>
  )
}

export default Switcher
