import React, { useState, useCallback, useRef } from 'react'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import { CSSTransition } from 'react-transition-group'
import style from './OneColumn.module.scss'
BScroll.use(Wheel)

const STATE_HIDE = 0
const STATE_SHOW = 1

const DATA = [
  {
    text: 'Venomancer',
    value: 1,
    disabled: 'wheel-disabled-item',
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

function OneColumnPicker() {
  const [state, setState] = useState(STATE_HIDE)
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [selectedText, setSelectedText] = useState('open')
  const [pickerData] = useState(DATA)
  const wheelWrapper = useRef<HTMLDivElement>(null)
  const [wheel, setWheel] = useState<BScroll | null>()

  const _confirm = () => {
    if (_isMoving()) {
      return
    }
    hide()

    if (wheel) {
      const currentSelectedIndex = wheel.getSelectedIndex()
      setSelectedIndex(currentSelectedIndex)
      setSelectedText(pickerData[selectedIndex].text)
      console.log(currentSelectedIndex)
    }
  }

  const _isMoving = useCallback(() => {
    return wheel && wheel.pending
  }, [wheel])

  const hide = useCallback(() => {
    setState(STATE_HIDE)
    wheel && wheel.disable()
  }, [wheel])

  const _createWheel = useCallback(
    (wheelWrapper) => {
      if (!wheel) {
        const bs = new BScroll(wheelWrapper, {
          wheel: {
            selectedIndex,
            wheelWrapperClass: 'wheel-scroll',
            wheelItemClass: 'wheel-item',
            wheelDisabledItemClass: 'wheel-disabled-item',
          },
          useTransition: false,
          probeType: 2,
        })
        bs.on('scrollEnd', () => {
          console.log(bs.getSelectedIndex())
        })
        setWheel(bs)
      } else {
        wheel.refresh()
      }
      return wheel
    },
    [selectedIndex, wheel],
  )

  const show = useCallback(() => {
    if (state === STATE_SHOW) {
      return
    }
    setState(STATE_SHOW)
    if (!wheel) {
      // waiting for DOM rendered
      setTimeout(() => {
        const wrapper = wheelWrapper.current
        console.log(wheelWrapper.current)
        _createWheel(wrapper)
      }, 0)
    } else {
      wheel.enable()
      wheel.wheelTo(selectedIndex)
    }
  }, [_createWheel, selectedIndex, state, wheel])

  return (
    <div className={`view`}>
      <ul className={style['example-list']}>
        <li className={style['example-item']} onClick={show}>
          <span className={style['open']}>{selectedText}</span>
        </li>
      </ul>
      <CSSTransition
        classNames="picker-fade"
        timeout={300}
        appear={true}
        in={state === 1}
      >
        <div
          className={style['picker']}
          style={state === 1 ? { display: 'block' } : { display: 'none' }}
          onTouchMove={(e) => e.preventDefault()}
          onClick={hide}
        >
          <CSSTransition
            classNames="picker-move"
            timeout={300}
            appear={true}
            in={state === 1}
          >
            <div
              style={state === 1 ? { display: 'block' } : { display: 'none' }}
              className={style['picker-panel']}
              onClick={(e) => e.preventDefault()}
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
                  <div className={style['wheel']} ref={wheelWrapper}>
                    <ul className={style['wheel-scroll']}>
                      {pickerData.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className={
                              item.disabled
                                ? `${style['wheel-disabled-item']} ${style['wheel-item']}`
                                : `${style['wheel-item']}`
                            }
                          >
                            {item.text}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
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

export default OneColumnPicker
