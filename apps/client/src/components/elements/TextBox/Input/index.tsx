import classNames from 'classnames'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import styles from './input.module.scss'
import OpenEyeIcon from './eye.svg?react'
import CrossedEye from './eye-crossed.svg?react'

interface InputI extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = forwardRef<HTMLInputElement, InputI>(
  ({ name, label, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPass = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className={styles.inputContainer}>
        <label
          className={classNames(styles.inputContainerLabel)}
          htmlFor={props.id || name || label}
        >
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          id={props.id || name || label}
          name={name}
          className={classNames(
            styles.inputContainerInput,
            { [styles.inputContainerPassword]: type === 'password' },
            props.className
          )}
          type={showPassword ? 'text' : type}
        />
        {type === 'password' ? (
          <button
            className={classNames(styles.inputContainerPasswordToggle)}
            onClick={toggleShowPass}
            type={'button'}
          >
            {showPassword ? <OpenEyeIcon /> : <CrossedEye />}
          </button>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
