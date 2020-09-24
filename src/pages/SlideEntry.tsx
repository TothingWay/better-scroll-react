import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

function SlideEntry(props: RouteConfigComponentProps) {
  const { route, history } = props

  const goPage = (path: string) => {
    history.push(path)
  }
  return (
    <div className="view slide">
      <ul className="example-list">
        <li className="example-item" onClick={() => goPage('/slide/banner')}>
          <span>banner slider</span>
        </li>
        <li className="example-item" onClick={() => goPage('/slide/fullpage')}>
          <span>page slider</span>
        </li>
        <li className="example-item" onClick={() => goPage('/slide/vertical')}>
          <span>vertical slider</span>
        </li>
      </ul>
      {renderRoutes(route?.routes)}
    </div>
  )
}

export default SlideEntry
