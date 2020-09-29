import React, { useState, useCallback, useRef, useEffect } from 'react'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import { CSSTransition } from 'react-transition-group'
import style from './index.module.scss'
BScroll.use(Wheel)

const STATE_HIDE = 0
const STATE_SHOW = 1

const DATA = [
  {
    text: '北京市',
    value: '110000',
    children: [
      {
        text: '北京市',
        value: '110100',
      },
    ],
  },
  {
    text: '天津市',
    value: '120000',
    children: [
      {
        text: '天津市',
        value: '120000',
      },
    ],
  },
  {
    text: '河北省',
    value: '130000',
    children: [
      {
        text: '石家庄市',
        value: '130100',
      },
      {
        text: '唐山市',
        value: '130200',
      },
      {
        text: '秦皇岛市',
        value: '130300',
      },
      {
        text: '邯郸市',
        value: '130400',
      },
      {
        text: '邢台市',
        value: '130500',
      },
      {
        text: '保定市',
        value: '130600',
      },
      {
        text: '张家口市',
        value: '130700',
      },
      {
        text: '承德市',
        value: '130800',
      },
    ],
  },
  {
    text: '山西省',
    value: '140000',
    children: [
      {
        text: '太原市',
        value: '140100',
      },
      {
        text: '大同市',
        value: '140200',
      },
      {
        text: '阳泉市',
        value: '140300',
      },
      {
        text: '长治市',
        value: '140400',
      },
      {
        text: '晋城市',
        value: '140500',
      },
      {
        text: '朔州市',
        value: '140600',
      },
      {
        text: '晋中市',
        value: '140700',
      },
    ],
  },
]

function LinkageColumnPicker() {
  const [state, setState] = useState(STATE_HIDE)
  const [selectedIndex, setSelectedIndex] = useState([0, 0])
  const [selectedText, setSelectedText] = useState('open')
  const [pickerData, setPickerData] = useState<Array<any>>([])
  const wheelWrapper = useRef<Array<HTMLDivElement>>([])
  const [wheels, setWheels] = useState<Array<BScroll>>([])

  useEffect(() => {
    _loadPickerData(selectedIndex, undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const _loadPickerData = useCallback(
    (newSelectedIndex, oldSelectedIndex) => {
      let provinces
      let cities
      // first instantiated
      if (!oldSelectedIndex) {
        provinces = DATA.map(({ value, text }) => ({ value, text }))
        cities = DATA[newSelectedIndex[0]].children
        setPickerData([provinces, cities])
      } else {
        // provinces'index changed, refresh cities data
        if (newSelectedIndex[0] !== oldSelectedIndex[0]) {
          cities = DATA[newSelectedIndex[0]].children
          setPickerData([pickerData[0], cities])
        }
      }
    },
    [pickerData],
  )

  useEffect(() => {
    // Since cities data changed
    // refresh better-scroll to recaculate scrollHeight
    wheels[1] && wheels[1].refresh()
  }, [pickerData, wheels])

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

  useEffect(() => {
    // when any of wheels'scrolling ended , you should refresh data
    for (let i = 0; i < wheels.length; i++) {
      let prevSelectedIndex = selectedIndex
      wheels[i].on('scrollEnd', () => {
        const currentSelectedIndex = wheels.map((wheel) =>
          wheel.getSelectedIndex(),
        )
        _loadPickerData(currentSelectedIndex, prevSelectedIndex)
        prevSelectedIndex = currentSelectedIndex
        console.log(i, wheels[i].getSelectedIndex())
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wheels])

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

export default LinkageColumnPicker
