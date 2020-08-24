import React from 'react'
import Button from '@/components/Button'
import Menu from '@/components/Menu'
import MenuItem from '@/components/Menu/menuItem'
import SubMenu from '@/components/Menu/subMenu'

function App() {
  return (
    <div className="App">
      <Menu>
        <MenuItem>menu1</MenuItem>
        <SubMenu title="menu2">
          <MenuItem>menu3</MenuItem>
        </SubMenu>
      </Menu>

      <Button type="danger" htmlType="reset">
        button
      </Button>
      <Button type="danger">button</Button>
      <Button type="link" href="https://www.baidu.com" disabled>
        button
      </Button>
    </div>
  )
}

export default App
