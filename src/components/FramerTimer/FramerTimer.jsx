import React, { useCallback, useRef, useState } from 'react'
import './timer.scss'
import { motion } from 'framer-motion'
import { MdLightMode } from 'react-icons/md'
import { MdModeNight } from 'react-icons/md'
import List from '../List'
import Bug from '../../assets/bug.svg'
import Planet from '../../assets/planet.svg'

const FramerTimer = () => {
  console.log('timer rendered')
  console.log('')

  const constraintsRef = useRef(null) // FRAMER MOTION
  const [mode, setMode] = useState(true) //MODE
  const [inputHandler, setInputHandler] = useState(true)
  const [time, setTime] = useState('')
  const [intervalId, setIntervalId] = useState(null)
  const [values, setValues] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  let interval
  const startTimer = () => {
    clearInterval(intervalId)
    const endDate =
      new Date().getTime() +
      values.days * 24 * 3600 * 1000 +
      values.hours * 3600 * 1000 +
      values.minutes * 60 * 1000 +
      (values.seconds + 1) * 1000

    interval = setInterval(() => {
      const startDate = new Date().getTime()
      const now = endDate - startDate

      if (now < 0) {
        clearInterval(interval)
        console.log('cleared')
      } else {
        console.log('interval works')

        setTime(now)
      }
    }, 1000)
    setIntervalId(interval)
    setInputHandler((prev) => !prev)
  }

  const days = Math.floor(time / (24 * 3600 * 1000))
  const hours = Math.floor((time % (24 * 3600 * 1000)) / (3600 * 1000))
  const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000))
  const seconds = Math.floor((time % (60 * 1000)) / 1000)

  const setTimer = useCallback((format, number) => {
    setValues((prev) => (prev = { ...prev, [format]: number }))
  }, [])
  // console.log(values)

  return (
    <div
      className={`container timer__container ${mode ? 'timer__container_light' : 'timer__container_dark'}`}
      ref={constraintsRef}>
      {mode ? (
        <MdModeNight className='timer__mode-icon timer__mode-icon_dark' onClick={() => setMode(false)} />
      ) : (
        <MdLightMode className='timer__mode-icon timer__mode-icon_light' onClick={() => setMode(true)} />
      )}

      <motion.img
        transition={{ duration: 1 }}
        initial={{ y: -48 }}
        animate={!inputHandler ? { y: 10 } : { y: -48 }}
        src={mode ? Bug : Planet}
        onTap={() => setInputHandler(true)}
        whileHover={{ rotate: [0, 10, -10, 10, 0] }}
        alt='bug'
        className={`timer__image`}
      />

      <motion.div
        className='timer__input'
        initial={{ y: -160 }}
        animate={inputHandler ? { y: 0 } : { y: -160 }}
        transition={{ duration: 1 }}>
        <h4>Set time:</h4>
        <div className='timer__input-box'>
          <List format={'days'} mode={mode} onChange={setTimer} />
          <p>days</p>
          <List format={'hours'} mode={mode} onChange={setTimer} />
          <p>hours</p>
          <List format={'minutes'} mode={mode} onChange={setTimer} />
          <p>min.</p>
          <List format={'seconds'} mode={mode} onChange={setTimer} />
          <p>sec.</p>
        </div>
        <motion.button
          className={`timer__button ${mode ? 'timer__button_light' : 'timer__button_dark'}`}
          whileTap={{ scale: 1.3 }}
          onTap={startTimer}>
          start
        </motion.button>
      </motion.div>

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
