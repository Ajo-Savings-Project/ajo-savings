import classNames from 'classnames'
import { InputHTMLAttributes, useState } from 'react'
import styles from './input.module.scss'
import OpenEyeIcon from './eye.svg?react'
import CrossedEye from './eye-crossed.svg?react'

interface InputI extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Input = ({ name, label, type, ...props }: InputI) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPass = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.inputContainer}>
      <label
        className={classNames(styles.inputContainerLabel)}
        htmlFor={name ?? label}
      >
        {label}
      </label>
      <input
        {...props}
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
        >
          {showPassword ? <OpenEyeIcon /> : <CrossedEye />}
        </button>
      ) : null}
    </div>
  )
}

export default Input
