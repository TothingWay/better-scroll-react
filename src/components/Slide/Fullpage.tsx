import React, { useRef, useEffect, useState } from 'react'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import style from './Fullpage.module.scss'

BScroll.use(Slide)

function Fullpage() {
  const slideRef = useRef<HTMLDivElement>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    const bs = new BScroll(slideRef.current!, {
      scrollX: true,
      scrollY: false,
      slide: {
        threshold: 100,
        loop: false,
        autoplay: false,
      },
      useTransition: false,
      momentum: false,
      bounce: false,
      stopPropagation: true,
    })

    bs.on('scrollEnd', () => {
      const pageIndex = bs.getCurrentPage().pageX
      setCurrentPageIndex(pageIndex)
    })

    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['slide-fullpage']}`}>
      <div className={style['banner-wrapper']}>
        <div className={style['slide-banner-wrapper']} ref={slideRef}>
          <div className={style['slide-banner-content']}>
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

export default Fullpage
