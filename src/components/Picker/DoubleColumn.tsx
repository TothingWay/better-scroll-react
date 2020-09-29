import React, { useState, useCallback, useRef } from 'react'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import { CSSTransition } from 'react-transition-group'
import style from './index.module.scss'
BScroll.use(Wheel)

const STATE_HIDE = 0
const STATE_SHOW = 1

const DATA1 = [
  {
    text: 'Venomancer',
    value: 1,
  },
  {
    text: 'Nerubian Weaver',
    value: 2,
  },
  {
    text: 'Spectre',
    value: 3,
  },
  {
    text: 'Juggernaut',
    value: 4,
  },
  {
    text: 'Karl',
    value: 5,
  },
  {
    text: 'Zeus',
    value: 6,
  },
  {
    text: 'Witch Doctor',
    value: 7,
  },
  {
    text: 'Lich',
    value: 8,
  },
  {
    text: 'Oracle',
    value: 9,
  },
  {
    text: 'Earthshaker',
    value: 10,
  },
]

const DATA2 = [
  {
    text: 'Durable',
    value: 'a',
  },
  {
    text: 'Pusher',
    value: 'b',
  },
  {
    text: 'Carry',
    value: 'c',
  },
  {
    text: 'Nuker',
    value: 'd',
  },
  {
    text: 'Support',
    value: 'e',
  },
  {
    text: 'Jungle',
    value: 'f',
  },
  {
    text: 'Escape',
    value: 'g',
  },
  {
    text: 'Initiator',
    value: 'h',
  },
]

function DoubleColumnPicker() {
  const [state, setState] = useState(STATE_HIDE)
  const [selectedIndex, setSelectedIndex] = useState([0, 0])
  const [selectedText, setSelectedText] = useState('open')
  const [pickerData] = useState([DATA1, DATA2])
  const wheelWrapper = useRef<Array<HTMLDivElement>>([])
  const [wheels, setWheels] = useState<Array<BScroll>>([])

  const _confirm = () => {
    if (_isMoving()) {
      return
    }
    hide()

    const currentSelectedIndex = wheels.map((wheel: BScroll) => {
      return wheel.getSelectedIndex()
    })

    setSelectedIndex(currentSelectedIndex)
    const currentSelectedValue = pickerData
      .map((data, index) => {
        return data[currentSelectedIndex[index]].text
      })
      .join('-')
    setSelectedText(currentSelectedValue)
    console.log(currentSelectedIndex)
  }

  const _isMoving = useCallback(() => {
    return (
      wheels &&
      wheels.some((wheel: BScroll) => {
        return wheel.pending
      })
    )
  }, [wheels])

  const hide = useCallback(() => {
    setState(STATE_HIDE)
    if (wheels) {
      console.log(wheels)

      for (let i = 0; i < pickerData.length; i++) {
        // if wheel is in animation, clear timer in it
        wheels[i].disable()
      }
    }
  }, [pickerData.length, wheels])

  const _createWheel = useCallback(
    (wheelWrapper, i) => {
      console.log(wheelWrapper[i])

      if (!wheels[i]) {
        const bs = new BScroll(wheelWrapper[i], {
          wheel: {
            selectedIndex: selectedIndex[i],
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
          },
          probeType: 3,
        })
        bs.on('scrollEnd', () => {
          console.log(i, bs.getSelectedIndex())
        })
        setWheels((val) => {
          if (val) {
            return [...val, bs]
          } else {
            return [bs]
          }
        })
      } else {
        wheels && wheels[i].refresh()
      }
      return wheels && wheels[i]
    },
    [selectedIndex, wheels],
  )

  const show = useCallback(() => {
    if (state === STATE_SHOW) {
      return
    }
    setState(STATE_SHOW)
    if (!wheels.length) {
      // waiting for DOM rendered
      setTimeout(() => {
        setWheels([])
        const wrapper = wheelWrapper.current

        for (let i = 0; i < pickerData.length; i++) {
          _createWheel(wrapper, i)
        }
      }, 0)
    } else {
      for (let i = 0; i < pickerData.length; i++) {
        wheels[i].enable()
        wheels[i].wheelTo(selectedIndex[i])
      }
    }
  }, [_createWheel, pickerData.length, selectedIndex, state, wheels])

  return (
    <div className={`view`}>
      <ul className={style['example-list']}>
        <li className={style['example-item']} onClick={show}>
          <span className={style['open']}>{selectedText}</span>
        </li>
      </ul>
      <CSSTransition classNames="picker-fade" timeout={300} in={state === 1}>
        <div
          className={style['picker']}
          style={state === 1 ? { display: 'block' } : { display: 'none' }}
          onTouchMove={(e) => e.preventDefault()}
          onClick={hide}
        >
          <CSSTransition
            classNames="picker-move"
            timeout={300}
            in={state === 1}
          >
            <div
              style={state === 1 ? { display: 'block' } : { display: 'none' }}
              className={style['picker-panel']}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`${style['picker-choose']} border-bottom-1px`}>
                <span className={style['cancel']} onClick={hide}>
                  Cancel
                </span>
                <span className={style['confirm']} onClick={_confirm}>
                  Confirm
                </span>
                <h1 className={style['picker-title']}>Title</h1>
              </div>
              <div className={style['picker-content']}>
                <div className={`${style['mask-top']} border-bottom-1px`}></div>
                <div className={`${style['mask-bottom']} border-top-1px`}></div>
                <div className={style['wheel-wrapper']}>
                  {pickerData.map((data, index) => {
                    wheelWrapper.current = []
                    return (
                      <div
                        key={index}
                        className={style['wheel']}
                        ref={(wheel: HTMLDivElement) =>
                          wheel && wheelWrapper.current.push(wheel)
                        }
                      >
                        <ul className={style['wheel-scroll']}>
                          {(data as []).map((item: any) => {
                            return (
                              <li
                                key={item.value}
                                className={`${style['wheel-item']}`}
                              >
                                {item.text}
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={style['picker-footer']}></div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  )
}

export default DoubleColumnPicker
