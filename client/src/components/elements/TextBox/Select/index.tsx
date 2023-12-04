import classNames from 'classnames'
import { forwardRef, SelectHTMLAttributes } from 'react'
import styles from './select.module.scss'
import arrowDropDownSvg from './svg/arrow_drop_down.svg'
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

        <div className={styles.select_icon_select}>
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
          <img
            src={arrowDropDownSvg}
            alt="select button dropdown"
            className={styles.select_icon}
          />
        </div>
      </div>
    )
  }

export default Select
