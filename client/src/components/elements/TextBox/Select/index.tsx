import classNames from 'classnames'
import { SelectHTMLAttributes } from 'react'
import styles from '../Input/input.module.scss'
import selectStyles from './select.module.scss'

interface SelectI extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}

const Select = ({ name, label, options, ...props }: SelectI) => {
  return (
    <div className={styles.inputContainer}>
      <label
        className={classNames(styles.inputContainerLabel)}
        htmlFor={name ?? label}
      >
        {label}
      </label>

      <select
        name={name}
        {...props}
        className={classNames(
          selectStyles.select,
          styles.inputContainerInput,
          props.className
        )}
      >
        {options.map(({ label, value }) => (
          <option key={label + value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
