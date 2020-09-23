import React, { useState, useRef, useEffect, useCallback } from 'react'
import BScroll from '@better-scroll/core'
import style from './DynamicContentScroll.module.scss'

function DynamicContentScroll() {
  const [switcher, setSwitcher] = useState(false)
  const [bs, setBs] = useState<BScroll | null>()
  const scroll = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    setSwitcher(!switcher)
  }, [switcher])

  useEffect(() => {
    bs?.refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switcher])

  useEffect(() => {
    const bScroll = new BScroll(scroll.current!, {
      probeType: 3,
      click: true,
    })

    bScroll.on('scroll', ({ y }: { y: number; x: number }) => {
      console.log('scrolling-' + y)
    })
    bScroll.on('scrollEnd', () => {
      console.log('scrollingEnd')
    })
    setBs(bScroll)
    return () => {
      bScroll.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['core-dynamic-content-container']}`}>
      <div className={style['scroll-wrapper']} ref={scroll}>
        {!switcher ? (
          <div className={style['scroll-content c1']} key="1">
            {[...Array(30)].map((n, index) => {
              return (
                <div className={style['scroll-item']} key={index}>
                  {index + 1}
                </div>
              )
            })}
          </div>
        ) : (
          <div className={style['scroll-content c2']} key="2">
            {[...Array(60)].map((n, index) => {
              return (
                <div className={style['scroll-item']} key={index}>
                  {60 - index}
                </div>
              )
            })}
          </div>
        )}
      </div>
      <button className={style['btn']} onClick={handleClick}>
        switch content element
      </button>
    </div>
  )
}

export default DynamicContentScroll
