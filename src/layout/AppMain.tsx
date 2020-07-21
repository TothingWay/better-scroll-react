import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'

export default memo(function AppMain() {
  return (
    <>
      <h4>BetterScroll</h4>
      <ul>
        <li>
          <NavLink to="/betterScroll/scroll">Scroll</NavLink>
        </li>
        <li>
          <NavLink to="/betterScroll/slide">Slide</NavLink>
        </li>
      </ul>
      <h4>SvgIcon</h4>
      <ul>
        <li>
          <NavLink to="/svgIcon">SvgIcon</NavLink>
        </li>
      </ul>
    </>
  )
})
