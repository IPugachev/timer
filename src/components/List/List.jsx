import React, { useEffect, useRef, useState } from 'react'
import Item from '../Item/Item'
import './list.scss'

const List = React.memo(function List() {
  const [activeItem, setActiveItem] = useState(0)
  const listRef = useRef()
  console.log('list rendered')

  useEffect(() => {
    if (listRef.current) {
      const handleScroll = () => setActiveItem(Math.floor(listRef.current.scrollTop / 29))
      listRef.current.addEventListener('scroll', () => console.log(listRef.current.scrollTop))
      return () => {
        listRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const test = (item) => {
    listRef.current.scrollTop = 29 * item
  }

  const numbersList = () => {
    const list = []
    for (let item = 0; item < 60; item++) {
      list.push(
        <li value={item} className='timer__list-item timer__list-item_active' key={item} onClick={() => test(item)}>
          {item < 10 ? '0' + item : item}
        </li>
      )
    }
    return list
  }

  return (
    <ul type='list' className='timer__list' ref={listRef}>
      <li className='timer__list-item timer__list-item_hidden'>0</li>
      <li className='timer__list-item timer__list-item_hidden'>0</li>

      {numbersList()}

      <li className='timer__list-item timer__list-item_hidden'>0</li>
      <li className='timer__list-item timer__list-item_hidden'>0</li>
    </ul>
  )
})

export default List
