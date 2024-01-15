import { useEffect } from 'react'
import { useAuth } from '../contexts'

let timeout: NodeJS.Timeout
const AutoLogOut = () => {
  const { handleClearSession } = useAuth()

  useEffect(() => {
    const func = function () {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        handleClearSession({ auto: true })
        // 5min
      }, 60000 * 5)
    }

    timeout = setTimeout(() => {
      // first run even if the mouse didn't move
      func()
    }, 2000)

    document.addEventListener('mousemove', func)
    document.addEventListener('keydown', func)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mousemove', func)
      document.removeEventListener('keydown', func)
    }
  }, [handleClearSession])
  return null
}

export default AutoLogOut
