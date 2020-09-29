import React, { useRef, useEffect, useState, useCallback } from 'react'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import style from './Default.module.scss'

BScroll.use(Pullup)

function PullupDefault() {
  const scroll = useRef<HTMLDivElement>(null)
  const [isPullUpLoad, setIsPullUpLoad] = useState(false)
  const [data, setData] = useState(30)

  const requestData = useCallback(async () => {
    try {
      const newData = (await ajaxGet(/* url */)) as number
      setData((val) => val + newData)
    } catch (err) {
      // handle err
      console.log(err)
    }
  }, [])

  const ajaxGet = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20)
      }, 1000)
    })
  }

  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      pullUpLoad: true,
    })

    bs.on('pullingUp', async () => {
      setIsPullUpLoad(true)

      await requestData()

      bs.finishPullUp()
      bs.refresh()
      setIsPullUpLoad(false)
    })

    return () => {
      bs.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`view ${style['pullup']}`}>
      <div className={style['pullup-wrapper']} ref={scroll}>
        <div className={style['pullup-content']}>
          <ul className={style['pullup-list']}>
            {[...Array(data)].map((n, index) => {
              return (
                <li className={style['pullup-list-item']} key={index}>
                  {(index + 1) % 5 === 0
                    ? 'scroll up 👆🏻'
                    : `I am item ${index + 1} `}
                </li>
              )
            })}
          </ul>
          <div className={style['pullup-tips']}>
            {!isPullUpLoad && (
              <div className={style['before-trigger']}>
                <span className={style['pullup-txt']}>
                  Pull up and load more
                </span>
              </div>
            )}
            {isPullUpLoad && (
              <div className={style['after-trigger']}>
                <span className={style['pullup-txt']}>Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PullupDefault
