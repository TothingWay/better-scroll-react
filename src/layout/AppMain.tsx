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
      </ul>
    </>
  )
})