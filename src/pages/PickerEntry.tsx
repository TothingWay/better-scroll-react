import React from 'react'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'

function PickerEntry(props: RouteConfigComponentProps) {
  const { route, history } = props

  const goPage = (path: string) => {
    history.push(path)
  }
  return (
    <div className="view picker">
      <ul className="example-list">
        <li
          className="example-item"
          onClick={() => goPage('/picker/one-column')}
        >
          <span>One Column Picker</span>
        </li>
        <li
          className="example-item"
          onClick={() => goPage('/picker/double-column')}
        >
          <span>Double Column Picker</span>
        </li>
        <li
          className="example-item"
          onClick={() => goPage('/picker/linkage-column')}
        >
          <span>Linkage Column Picker</span>
        </li>
      </ul>
      {renderRoutes(route?.routes)}
    </div>
  )
}

export default PickerEntry
