import styles from './switcher.module.scss'
import { useState, useRef } from 'react'
import classNames from 'classnames'

interface SwitcherProps {
  // name: string;
  onChange: (checked: boolean) => void
  value?: boolean
}

const Switcher = ({ onChange, value }: SwitcherProps) => {
  const [checked, setIsChecked] = useState(value || false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleToggle = () => {
    if (inputRef.current) {
      setIsChecked(!inputRef.current.checked)
      if (onChange) onChange(checked)
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
      ></button>
      <input
        name="toggle"
        ref={inputRef}
        className={styles.switcherWrapperInput}
        checked={checked}
        type="checkbox"
      />
    </div>
  )
}

export default Switcher
