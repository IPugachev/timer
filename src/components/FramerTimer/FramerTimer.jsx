import React, { useLayoutEffect, useRef, useState } from 'react'
import './timer.scss'
import { motion } from 'framer-motion'
import { MdLightMode } from 'react-icons/md'
import { MdModeNight } from 'react-icons/md'
import List from '../List'

const FramerTimer = () => {
  console.log('timer rendered')
  console.log('')
  const constraintsRef = useRef(null) // FRAMER MOTION
  const [mode, setMode] = useState(true) //MODE
  const [time, setTime] = useState('')

  let interval
  const startTimer = (endDate) => {
    // const endDate = new Date().getTime() + 14000
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
    const endDate = new Date().getTime()
    //+ 600000
    startTimer(endDate)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const days = Math.floor(time / (24 * 3600 * 1000))
  const hours = Math.floor((time % (24 * 3600 * 1000)) / (3600 * 1000))
  const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000))
  const seconds = Math.floor((time % (60 * 1000)) / 1000)

  return (
    <div
      className={`container timer__container ${mode ? 'timer__container_light' : 'timer__container_dark'}`}
      ref={constraintsRef}>
      {mode ? (
        <MdModeNight className='timer__mode-icon timer__mode-icon_dark' onClick={() => setMode(false)} />
      ) : (
        <MdLightMode className='timer__mode-icon timer__mode-icon_light' onClick={() => setMode(true)} />
      )}
      <div className='timer__input'>
        <h4>Set time:</h4>
        <List />
        <p>days</p>
        <List />
        <p>hours</p>
        <List />
        <p>min.</p>
        <List />
        <p>sec.</p>
      </div>

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0}
        dragTransition={{ bounceStiffness: 50 }}
        className={`timer ${mode ? 'timer_light' : 'timer_dark'}`}>
        <div className='timer__item'>
          <span>Days</span>
          <p>{`${days < 10 ? '0' : ''}${days}`}</p>
        </div>
        <div className='timer__item'>
          <span>Hours</span>
          <p>{`${hours < 10 ? '0' : ''}${hours}`}</p>
        </div>
        <div className='timer__item'>
          <span>Minutes</span>
          <p>{`${minutes < 10 ? '0' : ''}${minutes}`}</p>
        </div>
        <div className='timer__item'>
          <span>Seconds</span>
          <p>{`${seconds < 10 ? '0' : ''}${seconds}`}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default FramerTimer
