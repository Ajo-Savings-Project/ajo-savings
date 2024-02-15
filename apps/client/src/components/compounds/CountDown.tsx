import { useEffect, useState } from 'react'
import Typography from '../elements/Typography'

interface CountDownI {
  timer?: number
  text?: string
  isDisabled: boolean
  setIsDisabled: (state: boolean) => void
}

export default function CountDown({
  timer,
  text,
  isDisabled,
  setIsDisabled,
}: CountDownI) {
  const COUNTDOWN_KEY = 'ajo-reset-count:countDown'
  const TIMER = 5 // seconds

  const [countDown, setCountDown] = useState(timer || TIMER)

  useEffect(() => {
    const storedCountDown = localStorage.getItem(COUNTDOWN_KEY)
    if (storedCountDown && parseInt(storedCountDown) > 0) {
      setCountDown(parseInt(storedCountDown))
      setIsDisabled(true)
    }
  }, [isDisabled, setIsDisabled])

  useEffect(() => {
    if (isDisabled) {
      const intervalId = setInterval(() => {
        setCountDown((prevTime) => {
          return prevTime - 1
        })
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isDisabled])

  useEffect(() => {
    if (countDown <= 0) {
      localStorage.removeItem(COUNTDOWN_KEY)
      setCountDown(TIMER)
      setIsDisabled(false)
    } else {
      localStorage.setItem(COUNTDOWN_KEY, String(countDown))
    }
  }, [countDown, setIsDisabled])

  if (!isDisabled) return null

  return (
    <Typography size={'Small'} style={{ textAlign: 'center' }}>
      {text ? `${text} ${countDown}` : `Retry in ${countDown}`}
      {countDown > 9 ? ' secs' : ' sec'}
    </Typography>
  )
}
