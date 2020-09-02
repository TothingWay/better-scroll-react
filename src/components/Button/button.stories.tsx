import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from './index'

export default {
  title: 'Button',
  component: Button,
} as Meta

const TypeTemplate: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} type="default">
      default
    </Button>
    <Button {...args} type="primary">
      primary
    </Button>
    <Button {...args} type="danger">
      primary
    </Button>
    <Button
      {...args}
      type="link"
      href="https://github.com/TothingWay/Components-React"
    >
      primary
    </Button>
  </>
)

export const Types = TypeTemplate.bind({})

const SizesTemplate: Story<ButtonProps> = (args) => (
  <>
    <Button {...args} size="sm">
      Small
    </Button>
    <Button {...args}>medium</Button>
    <Button {...args} size="lg">
      large
    </Button>
  </>
)

export const Sizes = SizesTemplate.bind({})
