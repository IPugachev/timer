import React, { useLayoutEffect, useState } from 'react'
import './timer.scss'

const DefaultTimer = () => {
  console.log('timer rendered')
  console.log('')

  const [time, setTime] = useState('')
  // (24* 3600 * 1000) - days
  // (3600 * 1000) - hours
  // (60 * 1000) - minutes
  //  1000 - seconds

  let interval
  const startTimer = () => {
    // const endDate = new Date('March 13, 2022 00:00:00').getTime()
    const endDate = new Date().getTime() + 1400000
    interval = setInterval(() => {
      const startDate = new Date().getTime()
      const now = endDate - startDate

      if (now < 0) {
        clearInterval(interval)
      } else {
        console.log('interval works')

        setTime(now)
      }
    }, 1000)
  }

  useLayoutEffect(() => {
    startTimer()
    return () => {
      clearInterval(interval)
    }
  }, [])

  const days = Math.floor(time / (24 * 3600 * 1000))
  const hours = Math.floor((time % (24 * 3600 * 1000)) / (3600 * 1000))
  const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000))
  const seconds = Math.floor((time % (60 * 1000)) / 1000)

  return (
    <div className='container'>
      <div className='timer'>
        <div className='timer__item'>
          <p>{days}</p>
          <span>Days</span>
        </div>
        <div className='timer__item'>
          <p>{hours}</p>
          <span>Hours</span>
        </div>
        <div className='timer__item'>
          <p>{minutes}</p>
          <span>Minutes</span>
        </div>
        <div className='timer__item'>
          <p>{seconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default DefaultTimer
