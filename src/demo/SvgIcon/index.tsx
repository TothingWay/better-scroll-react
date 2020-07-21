import React, {useState, memo} from 'react'
import SvgIcon from '@/components/SvgIcon'
import svgIconsList from './svg-icons'
import style from './index.module.scss'

function SvgIconDemo() {
  const [svgIcons] = useState(svgIconsList)
  return (
    <div className={style['grid']}>
      {svgIcons.map(item=>{
        return <SvgIcon key={item} iconClass={item} className={style['icon-item']}/>
      })}
    </div>
  )
}

export default memo(SvgIconDemo)
