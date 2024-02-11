import classNames from 'classnames'
import { forwardRef, SelectHTMLAttributes } from 'react'
import styles from './select.module.scss'
import arrowDropDownSvg from './svg/arrow_drop_down.svg'

interface OptionI {
  label: string
  value: string | number
  disabled?: boolean
  selected?: boolean
}
interface SelectI extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: Array<OptionI>
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectI>(
  ({ name, label, placeholder, options, ...props }, ref) => {
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
            {[
              placeholder && { label: placeholder, value: '', selected: true },
              ...options,
            ]
              .filter(Boolean)
              .map((values) => {
                const { label, value, disabled, selected } = values as OptionI
                return (
                  <option
                    selected={selected}
                    key={label + value}
                    value={value}
                    disabled={disabled}
                  >
                    {label}
                  </option>
                )
              })}
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
)

Select.displayName = 'Select'

export default Select
