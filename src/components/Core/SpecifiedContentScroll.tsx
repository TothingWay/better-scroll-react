import React, { useRef, useEffect } from 'react'
import BScroll from '@better-scroll/core'
import style from './SpecifiedContentScroll.module.scss'

function SpecifiedContentScroll() {
  const scroll = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      specifiedIndexAsContent: 1,
      probeType: 3, // listening scroll hook
    })

    bs.on('scroll', ({ y }: { y: number; x: number }) => {
      console.log('scrolling-' + y)
    })
    bs.on('scrollEnd', () => {
      console.log('scrollingEnd')
    })

    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['core-specified-content-container']}`}>
      <div className={style['scroll-wrapper']} ref={scroll}>
        <div className={style['ignore-content']}>
          The Blue area is not taken as BetterScroll's content
        </div>
        <div className={style['scroll-content']}>
          {[...Array(30)].map((n, index) => {
            return (
              <div className={style['scroll-item']} key={index}>
                {index + 1}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SpecifiedContentScroll
