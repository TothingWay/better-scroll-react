import React, { useRef, useEffect, useState, useCallback } from 'react'
import BScroll from '@better-scroll/core'
import Zoom from '@better-scroll/zoom'
import style from './Default.module.scss'

BScroll.use(Zoom)

interface ZoomProps {
  scale: number
}

function ObserveDOMDefault() {
  const scroll = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState<BScroll | null>()
  const [linkworkTransform, setLinkworkTransform] = useState('scale(1)')

  useEffect(() => {
    const bs = new BScroll(scroll.current!, {
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      disableMouse: true,
      useTransition: true,
      zoom: {
        start: 1.5,
        min: 0.5,
        max: 3,
        initialOrigin: ['center', 'center'],
      },
    })

    bs.on('zooming', ({ scale }: ZoomProps) => {
      setLinkworkTransform(`scale(${scale})`)
    })

    bs.on('zoomEnd', ({ scale }: ZoomProps) => {
      console.log(scale)
    })

    setZoom(bs)

    return () => {
      bs.destroy()
      setZoom(null)
    }
  }, [])

  const zoomTo = useCallback(
    (value) => {
      if (zoom) {
        zoom.zoomTo(value, 'center', 'center')
      }
    },
    [zoom],
  )

  return (
    <div className={`view ${style['zoom-default']}`}>
      <div className={style['zoom-wrapper']} ref={scroll}>
        <div className={style['zoom-items']}>
          {[...Array(16)].map((n, index) => {
            return (
              <div className={style['grid-item']} key={index}>
                {index + 1}
              </div>
            )
          })}
        </div>
      </div>
      <div className={style['btn-wrap']}>
        <button className={style['zoom-half']} onClick={() => zoomTo(0.5)}>
          zoomTo:0.5
        </button>
        <button className={style['zoom-original']} onClick={() => zoomTo(1)}>
          zoomTo:1
        </button>
        <button className={style['zoom-double']} onClick={() => zoomTo(2)}>
          zoomTo:2
        </button>
      </div>
      <div className={style['linkwork-wrap']}>
        <p>changing with zooming action</p>
        <div
          className={style['linkwork-block']}
          style={{ transform: linkworkTransform }}
        />
      </div>
    </div>
  )
}

export default ObserveDOMDefault
