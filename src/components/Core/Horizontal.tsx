import React, { useRef, useEffect } from 'react'
import BScroll from '@better-scroll/core'
import style from './Horizontal.module.scss'

const emojis = [
  '👉🏼 😁 😂 🤣 👈🏼',
  '😄 😅 😆 😉 😊',
  '😫 😴 😌 😛 😜',
  '👆🏻 😒 😓 😔 👇🏻',
  '😑 😶 🙄 😏 😣',
  '😞 😟 😤 😢 😭',
  '🤑 😲 ☹️ 🙁 😖',
  '👍 👎 👊 ✊ 🤛',
  '☝️ ✋ 🤚 🖐 🖖',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒',
]

function Horizontal() {
  const scroll = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      scrollX: true,
      probeType: 3, // listening scroll hook
    })

    bs.on('scroll', ({ x }: { y: number; x: number }) => {
      console.log('scrolling-' + x)
    })
    bs.on('scrollEnd', () => {
      console.log('scrollingEnd')
    })

    return () => {
      bs.destroy()
    }
  }, [])
  return (
    <div className={`view ${style['horizontal-container']}`}>
      <div className={style['scroll-wrapper']} ref={scroll}>
        <div className={style['scroll-content']}>
          {emojis.map((item, index) => {
            return (
              <div className={style['scroll-item']} key={index}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Horizontal
