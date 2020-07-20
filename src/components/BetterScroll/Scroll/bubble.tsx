import React, {
  useState,
  useEffect,
  forwardRef,
  useRef,
  useCallback
} from 'react'
import { PullDownProps } from './data'

const Bubble = forwardRef<HTMLCanvasElement, PullDownProps>((props, ref) => {
  const { y = 0 } = props
  const bubbleRef = useRef<HTMLCanvasElement>(null)
  const [ratio] = useState(window.devicePixelRatio)
  const [width, setWidth] = useState(50)
  const [height, setHeight] = useState(80)
  const [initRadius] = useState(18 * ratio)
  const [minHeadRadius] = useState(12 * ratio)
  const [minTailRadius] = useState(5 * ratio)
  const [initArrowRadius] = useState(10 * ratio)
  const [minArrowRadius] = useState(6 * ratio)
  const [arrowWidth] = useState(3 * ratio)
  const [maxDistance] = useState(40 * ratio)
  const [initCenterX] = useState(25 * ratio)
  const [initCenterY] = useState(25 * ratio)
  const [headCenter] = useState({
    x: initCenterX,
    y: initCenterY,
  })

  const [distance, setDistance] = useState(0)
  const [style, setStyle] = useState<any>()

  useEffect(() => {
    setWidth(width * ratio)
    setHeight(height * ratio)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // distance
  useEffect(() => {
    setDistance(Math.max(0, Math.min(y * ratio, maxDistance)))
  }, [ratio, maxDistance, y])

  // style
  useEffect(() => {
    setStyle({
      width: `${width / ratio}px`,
      height: `${height / ratio}px`,
    })
  }, [height, ratio, width])

  const _drawBubble = useCallback(
    (ctx) => {
      ctx.save()
      ctx.beginPath()
      const rate = distance / maxDistance
      const headRadius = initRadius - (initRadius - minHeadRadius) * rate
      headCenter.y = initCenterY - (initRadius - minHeadRadius) * rate
      // 画上半弧线
      ctx.arc(headCenter.x, headCenter.y, headRadius, 0, Math.PI, true)
      // 画左侧贝塞尔
      const tailRadius = initRadius - (initRadius - minTailRadius) * rate
      const tailCenter = {
        x: headCenter.x,
        y: headCenter.y + distance,
      }
      const tailPointL = {
        x: tailCenter.x - tailRadius,
        y: tailCenter.y,
      }
      const controlPointL = {
        x: tailPointL.x,
        y: tailPointL.y - distance / 2,
      }
      ctx.quadraticCurveTo(
        controlPointL.x,
        controlPointL.y,
        tailPointL.x,
        tailPointL.y
      )
      // 画下半弧线
      ctx.arc(tailCenter.x, tailCenter.y, tailRadius, Math.PI, 0, true)
      // 画右侧贝塞尔
      const headPointR = {
        x: headCenter.x + headRadius,
        y: headCenter.y,
      }
      const controlPointR = {
        x: tailCenter.x + tailRadius,
        y: headPointR.y + distance / 2,
      }
      ctx.quadraticCurveTo(
        controlPointR.x,
        controlPointR.y,
        headPointR.x,
        headPointR.y
      )
      ctx.fillStyle = 'rgb(170,170,170)'
      ctx.fill()
      ctx.strokeStyle = 'rgb(153,153,153)'
      ctx.stroke()
      ctx.restore()
    },
    [
      distance,
      headCenter.x,
      headCenter.y,
      initCenterY,
      initRadius,
      maxDistance,
      minHeadRadius,
      minTailRadius,
    ]
  )

  const _drawArrow = useCallback(
    (ctx) => {
      ctx.save()
      ctx.beginPath()
      const rate = distance / maxDistance
      const arrowRadius =
        initArrowRadius - (initArrowRadius - minArrowRadius) * rate
      // 画内圆
      ctx.arc(
        headCenter.x,
        headCenter.y,
        arrowRadius - (arrowWidth - rate),
        -Math.PI / 2,
        0,
        true
      )
      // 画外圆
      ctx.arc(
        headCenter.x,
        headCenter.y,
        arrowRadius,
        0,
        (Math.PI * 3) / 2,
        false
      )
      ctx.lineTo(
        headCenter.x,
        headCenter.y - arrowRadius - arrowWidth / 2 + rate
      )
      ctx.lineTo(
        headCenter.x + arrowWidth * 2 - rate * 2,
        headCenter.y - arrowRadius + arrowWidth / 2
      )
      ctx.lineTo(
        headCenter.x,
        headCenter.y - arrowRadius + (arrowWidth * 3) / 2 - rate
      )
      ctx.fillStyle = 'rgb(255,255,255)'
      ctx.fill()
      ctx.strokeStyle = 'rgb(170,170,170)'
      ctx.stroke()
      ctx.restore()
    },
    [
      arrowWidth,
      distance,
      headCenter.x,
      headCenter.y,
      initArrowRadius,
      maxDistance,
      minArrowRadius,
    ]
  )

  const _draw = useCallback(() => {
    const bubble = bubbleRef.current!
    let ctx = bubble.getContext('2d')
    ctx!.clearRect(0, 0, bubble.width, bubble.height)
    _drawBubble(ctx)
    _drawArrow(ctx)
  }, [_drawArrow, _drawBubble])

  useEffect(() => {
    _draw()
  }, [_draw, y])

  return (
    <canvas
      ref={bubbleRef}
      width={width}
      height={height}
      style={style}
    />
  )
})

export default Bubble
