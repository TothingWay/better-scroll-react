import React, {
  FC,
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  MouseEventHandler,
  memo,
} from 'react'
import classnames from 'classnames'

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
export type ButtonHTMLType = 'submit' | 'button' | 'reset'

interface BaseButtonProps {
  className?: string
  /* 设置 Button 的禁用 */
  disabled?: boolean
  /* 设置 Button 的尺寸 */
  size?: ButtonSize
  /* 设置 Button 的类型 */
  type?: ButtonType
  children: ReactNode
}

export type AnchorButtonProps = {
  href: string
  target?: string
  onClick?: MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick'>

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType
  onClick?: MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<ButtonHTMLAttributes<any>, 'type' | 'onClick'>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = ({
  className,
  disabled,
  size,
  type,
  children,
  href,
  htmlType,
  ...restProps
}) => {
  const classes = classnames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    disabled: type === 'link' && disabled,
  })
  if (type === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button
        type={htmlType}
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  type: 'default',
  htmlType: 'button' as ButtonHTMLType,
}

export default memo(Button)
