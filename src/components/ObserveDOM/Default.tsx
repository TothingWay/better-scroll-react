import React, { useRef, useEffect, useState } from 'react'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import style from './Default.module.scss'

BScroll.use(ObserveDOM)

function ObserveDOMDefault() {
  const scroll = useRef<HTMLDivElement>(null)
  const [nums, setNums] = useState(10)

  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      observeDOM: true,
      scrollX: true,
      scrollY: false,
    })

    return () => {
      bs.destroy()
    }
  }, [])

  const handleClick = () => {
    setNums(nums + 2)
  }
  return (
    <div className={`view ${style['observe-dom-container']}`}>
      <div className={style['scroll-wrapper']} ref={scroll}>
        <div className={style['scroll-content']}>
          {[...Array(nums)].map((n, index) => {
            return (
              <div className={style['scroll-item']} key={index}>
                {nums - index + 1 + 1}
              </div>
            )
          })}
        </div>
      </div>
      <button className={style['btn']} onClick={handleClick}>
        append two children element
      </button>
    </div>
  )
}

export default ObserveDOMDefault
