import classNames from 'classnames'
import { SelectHTMLAttributes } from 'react'
import styles from './select.module.scss'

interface SelectI extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}

const Select = ({ name, label, disabled, options, ...props }: SelectI) => {
  return (
    <div className={styles.inputContainer}>
      <label
        className={classNames(styles.inputContainerLabel)}
        htmlFor={props.id || name || label}
      >
        {label}
      </label>

      <select
        name={name}
        {...props}
        id={props.id || name || label}
        className={classNames(
          styles.select,
          styles.inputContainerInput,
          props.className
        )}
      >
        {options.map(({ label, value }) => (
          <option key={label + value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
