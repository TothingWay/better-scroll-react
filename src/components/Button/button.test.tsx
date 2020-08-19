import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './index'

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  type: 'primary',
  size: 'lg',
  className: 'klass',
  htmlType: 'button',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Button</Button>)
    const element = wrapper.getByText('Button')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>Button</Button>)
    const element = wrapper.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-primary btn-lg klass')
    expect(element).toHaveAttribute('type', 'button')
    expect(element.disabled).toBeFalsy()
  })
  it('should render a link when type equals link and href is provided', () => {
    const wrapper = render(
      <Button type="link" href="https://github.com/">
        Link
      </Button>,
    )
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(
      <Button {...disabledProps} disabled={true}>
        Button
      </Button>,
    )
    const element = wrapper.getByText('Button') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})
