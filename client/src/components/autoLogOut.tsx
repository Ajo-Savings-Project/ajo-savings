import { useEffect } from 'react'
import { useAuth } from '../contexts'

let timeout: number
const AutoLogOut = () => {
  const { handleClearSession } = useAuth()

  useEffect(() => {
    const func = function () {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        handleClearSession({ auto: true })
      }, 60000 * 5)
    }
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
