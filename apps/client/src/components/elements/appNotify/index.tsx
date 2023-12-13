import classNames from 'classnames'
import { ReactNode } from 'react'
import toast, { ToastOptions } from 'react-hot-toast'
import styles from './appnotify.module.scss'

export const appNotify = (
  type: 'success' | 'error' | 'info',
  message: string | ReactNode,
  onRetry?: () => void,
  options?: ToastOptions
) => {
  return toast.custom(
    (t) => (
      <div
        className={classNames(styles.notify, {
          [styles.notifyError]: type === 'error',
          [styles.notifySuccess]: type === 'success',
          [styles.notifyInfo]: type === 'info',
        })}
      >
        <div className={styles.notifyMessage}>
          <p>{type}</p>
          <div>{message}</div>
        </div>
        <div className={styles.notifyActions}>
          {onRetry && (
            <>
              <button onClick={onRetry}>Retry</button>
              <hr />
            </>
          )}
          <button onClick={() => toast.dismiss(t.id)}>Close</button>
        </div>
      </div>
    ),
    options
  )
}
