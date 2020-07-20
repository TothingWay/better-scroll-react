import React, { memo, useRef, useState } from 'react'
import Scroll from '@/components/BetterScroll/Scroll'
import { scrollImperativeHandle } from '@/components/BetterScroll/Scroll/data'
import style from './index.module.scss'

function randArray(len: number, min: number, max: number) {
  return Array.from(
    { length: len },
    (v) => Math.floor(Math.random() * (max - min)) + min
  )
}

function ScrollDemo() {
  const ref = useRef<scrollImperativeHandle>(null)
  const [dataList, setdataList] = useState<Array<any>>(randArray(50, 0, 1000))


  const handlePullDown = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setdataList(randArray(50, 0, 1000))
        resolve()
      }, 600)
    })
  }

  const handlePullUp = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setdataList(dataList.concat(randArray(20, 0, 100)))
        resolve()
      }, 600)
    })
    
  }

  return (
    <Scroll
      ref={ref}
      pullDownLoading={true}
      pullDown={handlePullDown}
      pullUpLoading={true}
      pullUp={handlePullUp}
    >
      <ul className={style['scroll-list']}>
        {dataList.map((item, index) => {
          return (
            <li
              className={style['scroll-list-item']}
              key={index}
            >{`I am item ${item} `}</li>
          )
        })}
      </ul>
    </Scroll>
  )
}

export default memo(ScrollDemo)
