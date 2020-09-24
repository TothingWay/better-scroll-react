import React, { useRef, useEffect, useState, useCallback } from 'react'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import style from './Banner.module.scss'

BScroll.use(Slide)

interface PageProps {
  x: number
  y: number
  pageX: number
  pageY: number
}

function Banner() {
  const slideRef = useRef<HTMLDivElement>(null)
  const [slide, setSlide] = useState<BScroll | null>()
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const nextPage = useCallback(() => {
    if (slide) {
      slide.next()
    }
  }, [slide])

  const prePage = useCallback(() => {
    if (slide) {
      slide.prev()
    }
  }, [slide])

  useEffect(() => {
    const bs = new BScroll(slideRef.current!, {
      scrollX: true,
      scrollY: false,
      slide: true,
      useTransition: true,
      momentum: false,
      bounce: false,
      stopPropagation: true,
      probeType: 2,
    })

    bs.on('slideWillChange', (page: PageProps) => {
      setCurrentPageIndex(page.pageX)
    })
    bs.on('scrollEnd', () => {
      console.log(bs.getCurrentPage())
    })

    setSlide(bs)

    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['slide-banner']}`}>
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
      <div className={style['btn-wrap']}>
        <button className={style['prev']} onClick={prePage}>
          prePage
        </button>
        <button className={style['next']} onClick={nextPage}>
          nextPage
        </button>
      </div>
    </div>
  )
}

export default Banner
