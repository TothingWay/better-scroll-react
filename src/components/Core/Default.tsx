import React, { useRef, useEffect } from 'react'
import BScroll from '@better-scroll/core'
import style from './default.module.scss'

const emojis = [
  '😀 😁 😂 🤣 😃',
  '😄 😅 😆 😉 😊',
  '😫 😴 😌 😛 😜',
  '👆🏻 😒 😓 😔 👇🏻',
  '😑 😶 🙄 😏 😣',
  '😞 😟 😤 😢 😭',
  '🤑 😲 🙄 🙁 😖',
  '👍 👎 👊 ✊ 🤛',
  '🙄 ✋ 🤚 🖐 🖖',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒',
  '💫 💥 💢 💦 💧',
  '🐠 🐟 🐬 🐳 🐋',
  '😬 😐 😕 😯 😶',
  '😇 😏 😑 😓 😵',
  '🐥 🐣 🐔 🐛 🐤',
  '💪 ✨ 🔔 ✊ ✋',
  '👇 👊 👍 👈 👆',
  '💛 👐 👎 👌 💘',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒',
  '💫 💥 💢 💦 💧',
  '🐠 🐟 🐬 🐳 🐋',
  '😬 😐 😕 😯 😶',
  '😇 😏 😑 😓 😵',
  '🐥 🐣 🐔 🐛 🐤',
  '💪 ✨ 🔔 ✊ ✋',
  '👇 👊 👍 👈 👆',
  '💛 👐 👎 👌 💘',
]

function Default() {
  const scroll = useRef<HTMLDivElement>(null)
  const clickHandler = (item: any) => {
    window.alert(item)
  }
  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      probeType: 3,
      click: true,
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
    <div className={`view ${style['core-container']}`}>
      <div className={style['scroll-wrapper']} ref={scroll}>
        <div className={style['scroll-content']}>
          {emojis.map((item, index) => {
            return (
              <div
                className={style['scroll-item']}
                key={index}
                onClick={() => clickHandler(item)}
              >
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Default
