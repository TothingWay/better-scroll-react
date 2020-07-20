import React, { memo } from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import style from './index.module.scss'
import SvgIcon from '@/components/SvgIcon'
import { NavLink } from 'react-router-dom'

export default memo(function Header(props: RouteConfigComponentProps) {
  const { route, location } = props
  const current = location.pathname
  const showBackBtn = current === '/' ? {display: 'none'} : {display: 'block'}
  return (
    <>
      <div className={style['header']}>
        <NavLink to="/" style={showBackBtn}>
          <SvgIcon iconClass="back" className={style['svg-icon-back']} />
        </NavLink>
        <span className={style['header-name']}>
          {
            route!.routes!.find((item) => {
              return item.path === current
            })!.name || 'Component-React'
          }
        </span>
      </div>
      <div className={style['appMain']}>{renderRoutes(route!.routes)}</div>
    </>
  )
})
