import React, { useEffect, useRef } from 'react'
import './list.scss'

const List = React.memo(function List({ format, onChange, mode }) {
  console.log('list rendered')

  const listRef = useRef()

  useEffect(() => {
    const handleScroll = () => {
      onChange(format, Math.floor(listRef.current.scrollTop / 29) - 2)
    }
    listRef.current.addEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (item) => {
    listRef.current.scrollTop = 29 * (item + 1)
  }

  const numbersList = () => {
    const list = []
    for (let item = 0; item < 60; item++) {
      list.push(
        <li
          value={item}
          className={`timer__list-item ${mode ? 'timer__list-item_light' : 'timer__list-item_dark'}`}
          key={item}
          onClick={() => scrollTo(item)}>
          {item < 10 ? '0' + item : item}
        </li>
      )
    }
    return list
  }

  return (
    <ul type='list' className='timer__list' ref={listRef}>
      <li className='timer__list-item_hidden'>0</li>
      <li className='timer__list-item_hidden'>0</li>
      {numbersList()}
      <li className='timer__list-item_hidden'>0</li>
      <li className='timer__list-item_hidden'>0</li>
    </ul>
  )
})

export default List
