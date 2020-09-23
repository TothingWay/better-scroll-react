import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

function CoreEntry(props: RouteConfigComponentProps) {
  const { route, history } = props

  const goPage = (path: string) => {
    history.push(path)
  }
  return (
    <div className="view core">
      <ul className="example-list">
        <li className="example-item" onClick={() => goPage('/core/default')}>
          <span>vertical</span>
        </li>
        <li className="example-item" onClick={() => goPage('/core/horizontal')}>
          <span>horizontal</span>
        </li>
        <li
          className="example-item"
          onClick={() => goPage('/core/dynamic-content')}
        >
          <span>dynamic-content</span>
        </li>
        <li
          className="example-item"
          onClick={() => goPage('/core/specified-content')}
        >
          <span>specified-content</span>
        </li>
        <li className="example-item" onClick={() => goPage('/core/freescroll')}>
          <span>freescroll</span>
        </li>
      </ul>
      {renderRoutes(route?.routes)}
    </div>
  )
}

export default CoreEntry
