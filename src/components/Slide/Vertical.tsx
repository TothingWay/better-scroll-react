import React, { useRef, useEffect, useState } from 'react'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import style from './Vertical.module.scss'

BScroll.use(Slide)

function Vertical() {
  const slideRef = useRef<HTMLDivElement>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    const bs = new BScroll(slideRef.current!, {
      scrollX: false,
      scrollY: true,
      slide: {
        threshold: 100,
      },
      useTransition: true,
      momentum: false,
      bounce: false,
      stopPropagation: true,
    })

    bs.on('scrollEnd', () => {
      const pageIndex = bs.getCurrentPage().pageY
      setCurrentPageIndex(pageIndex)
    })

    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['slide-vertical']}`}>
      <div className={style['vertical-wrapper']}>
        <div className={style['slide-vertical-wrapper']} ref={slideRef}>
          <div className={style['slide-vertical-content']}>
            {[...Array(4)].map((n, index) => {
              return (
                <div
                  className={`${style['slide-page']} ${
                    style['page' + (index + 1)]
                  }`}
                  key={index}
                >
                  {'page' + (index + 1)}
                </div>
              )
            })}
          </div>
        </div>
        <div className={style['dots-wrapper']}>
          {[...Array(4)].map((n, index) => {
            return (
              <div
                className={`${style['dot']} ${
                  currentPageIndex === index ? style['active'] : ''
                }`}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Vertical
