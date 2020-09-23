import React, { memo } from 'react'
import './App.scss'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
interface ExamplesType {
  name: string
  path: string
}

function App(props: RouteConfigComponentProps) {
  const examples: ExamplesType[] = [
    {
      name: 'core scroll',
      path: '/core',
    },
    {
      name: 'slide',
      path: '/slide',
    },
    {
      name: 'zoom',
      path: '/zoom',
    },
    {
      name: 'picker',
      path: '/picker',
    },
    {
      name: 'pullup',
      path: '/pullup',
    },
    {
      name: 'pulldown',
      path: '/pulldown',
    },
    {
      name: 'scrollbar',
      path: '/scrollbar',
    },
    {
      name: 'infinity',
      path: '/infinity',
    },
    {
      name: 'form',
      path: '/form',
    },
    {
      name: 'nested-scroll',
      path: '/nested-scroll',
    },
    {
      name: 'mouse-wheel',
      path: '/mouse-wheel',
    },
    {
      name: 'movable',
      path: '/movable',
    },
    {
      name: 'compose plugins',
      path: '/compose',
    },
  ]

  const { route, history } = props

  const goPage = (path: string) => {
    history.push(path)
  }

  return (
    <div>
      <section className="page-header">
        <h1 className="project-name">BetterScroll</h1>
        <h2 className="project-tagline">
          inspired by iscroll, and it has a better scroll perfermance
        </h2>
      </section>
      <section className="main-content">
        <div className="example">
          <ul className="example-list">
            {examples.map((item) => {
              return (
                <li
                  className="example-item"
                  key={item.path}
                  onClick={() => goPage(item.path)}
                >
                  <span>{item.name}</span>
                </li>
              )
            })}
            <li className="example-item placeholder"></li>
          </ul>
        </div>
      </section>
      {renderRoutes(route?.routes)}
    </div>
  )
}

export default memo(App)
