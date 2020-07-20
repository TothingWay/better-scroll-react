import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  ReactNode,
  useCallback,
} from 'react'
import style from './index.module.scss'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'
import { scrollImperativeHandle } from './data'

import PullDownLoading from './bubble'
import Loading from './loading'

BScroll.use(Pullup)
BScroll.use(PullDown)

type ScrollProps = {
  children?: ReactNode
  direction?: 'vertical' | 'horizental'
  click?: boolean
  refresh?: boolean
  onScroll?: Function
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  pullUp?: Function
  pullDown?: Function
  bounceTop?: boolean //是否支持向上吸顶
  bounceBottom?: boolean //是否支持向下吸顶
  threshold?: number
  stop?: number
}

const Scroll = forwardRef<scrollImperativeHandle, ScrollProps>((props, ref) => {
  const [bScroll, setBScroll] = useState<BScroll | null>()
  const [beforePullDown, setBeforePullDown] = useState(true)
  const [isPullingDown, setIsPullingDown] = useState(false)
  const [isPullUpLoad, setIsPullUpLoad] = useState(false)
  const [pullDownY, setPullDownY] = useState(0)
  const [pullDownStyle, setPullDownStyle] = useState<any>({
    top: '-50px',
  })
  const scrollRef = useRef<HTMLDivElement>(null)

  // Attribute props
  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true,
    threshold = 70,
    stop = 60,
  } = props

  // Method props
  const { pullUp, pullDown, onScroll } = props

  const finishPullDown = useCallback(async () => {
    if (!bScroll) {
      return
    }
    let timer: any = null
    await new Promise((resolve) => {
      setTimeout(() => {
        setIsPullingDown(false)
        setPullDownStyle({
          top: `-50px`,
        })
        clearTimeout(timer)
        timer = setTimeout(() => {
          setBeforePullDown(true)
        }, 600)
        bScroll.finishPullDown()
        bScroll.refresh()
        resolve()
      }, 600)
    })
  }, [bScroll])

  // init BScroll
  useEffect(() => {
    if (bScroll) return
    const scroll = new BScroll(scrollRef.current!, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
      pullDownRefresh: pullDownLoading
        ? {
            threshold,
            stop,
          }
        : false,
      pullUpLoad: pullUpLoading,
      stopPropagation: true,
    })
    setBScroll(scroll)
    return () => {
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  // watch onScroll
  useEffect(() => {
    if (!bScroll || !onScroll) return
    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  // watch pullingUp
  useEffect(() => {
    if (!bScroll) return
    const handlePullUp = async () => {
      setIsPullUpLoad(true)
      await (pullUp && pullUp())
      bScroll.finishPullUp()
      bScroll.refresh()
      setIsPullUpLoad(false)
    }
    bScroll.on('pullingUp', handlePullUp)
    return () => {
      bScroll.off('pullingUp', handlePullUp)
    }
  }, [pullUp, bScroll])

  // watch pullingDown scroll
  useEffect(() => {
    if (!bScroll || !pullDownLoading) return
    let pullingDown = (pos: any) => {
      if (beforePullDown) {
        const bubbleY = Math.max(1, pos.y - 50)
        setPullDownStyle({
          top: `${Math.min(pos.y - 50, 0)}px`,
        })
        setPullDownY(bubbleY)
      } else {
        setPullDownY(1)
      }
    }
    bScroll.on('scroll', pullingDown)

    return () => {
      bScroll.off('scroll', pullingDown)
    }
  }, [bScroll, beforePullDown, pullDownLoading])

  // watch pullingDown
  useEffect(() => {
    if (!bScroll || !pullDownLoading || !pullDown) return

    const pullingDownHandler = async () => {
      setBeforePullDown(false)
      setIsPullingDown(true)
      await pullDown()
      finishPullDown()
    }

    bScroll.on('pullingDown', pullingDownHandler)
    return () => {
      bScroll.off('pullingDown', pullingDownHandler)
    }
  }, [bScroll, finishPullDown, pullDown, pullDownLoading])

  // refresh BScroll
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll
      }
    },
    finishPullDown() {
      if (bScroll) {
        // setBeforePullDown(false)
        bScroll.finishPullDown()
      }
    },
  }))

  return (
    <div className={style['scroll-wrapper']} ref={scrollRef}>
      <div className="scroller">
        {props.children}
        {/* pullUp loading */}
        {pullUpLoading && (
          <div className={style['pullUp-wrapper']}>
            {isPullUpLoad ? <Loading /> : <span>Pull up and load more</span>}
          </div>
        )}
      </div>
      {/* pulldown loading */}
      {pullDownLoading && (
        <div className={style['pulldown-wrapper']} style={pullDownStyle}>
          {beforePullDown ? (
            <PullDownLoading y={pullDownY} />
          ) : isPullingDown ? (
            <Loading />
          ) : null}
        </div>
      )}
    </div>
  )
})

export default Scroll
