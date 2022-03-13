import React, { useRef, useState } from 'react'
import './item.scss'

const Item = React.memo(function Item({ number }) {
  console.log('item rendered')
  const itemRef = useRef()

  const scroll = () => {
    itemRef.current.scrollIntoView({ block: 'center' })
  }

  return (
    <li value={number} className='timer__list-item timer__list-item_active' ref={itemRef} onClick={scroll}>
      {number < 10 ? '0' + number : number}
    </li>
  )
})

export default Item
