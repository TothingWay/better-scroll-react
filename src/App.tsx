import React from 'react'
import Button from '@/components/Button'

function App() {
  return (
    <div className="App">
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
