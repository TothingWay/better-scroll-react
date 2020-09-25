import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'
import './styles/base.scss'

const Root = () => {
  return <HashRouter>{renderRoutes(routes)}</HashRouter>
}

ReactDOM.render(<Root />, document.getElementById('root'))
