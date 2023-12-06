import classNames from 'classnames'
import { forwardRef, SelectHTMLAttributes } from 'react'
import styles from './select.module.scss'

interface SelectI extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}

const Select = forwardRef<HTMLSelectElement, SelectI>(
  ({ name, label, disabled, options, ...props }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label
          className={classNames(styles.inputContainerLabel)}
          htmlFor={props.id || name || label}
        >
          {label}
        </label>

        <select
          ref={ref}
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
)

Select.displayName = 'Select'

export default Select
