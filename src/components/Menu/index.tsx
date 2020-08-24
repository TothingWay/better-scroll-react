import React, {
  FC,
  useState,
  createContext,
  CSSProperties,
  memo,
  ReactNode,
} from 'react'
import classNames from 'classnames'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

type MenuMode = 'horizontal' | 'vertical'

type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
  /* 默认 active 的菜单项的索引值 */
  defaultIndex?: string
  className?: string
  /* 菜单类型 横向或者纵向 */
  mode?: MenuMode
  style?: CSSProperties
  /* 点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback
  /* 设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[]
  children?: ReactNode
}

interface MenuContextType {
  index: string
  onSelect?: SelectCallback
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export type MenuComponent = {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

export const MenuContext = createContext<MenuContextType>({ index: '0' })

export const Menu: FC<MenuProps> & MenuComponent = ({
  className,
  mode,
  style,
  children,
  defaultIndex,
  onSelect,
  defaultOpenSubMenus,
}) => {
  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: MenuContextType = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component',
        )
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

Menu.Item = MenuItem
Menu.SubMenu = SubMenu

export default memo(Menu)
