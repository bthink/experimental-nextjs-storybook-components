import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  // Add argTypes for props if needed
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    variant: {
      control: { type: 'select' }, // Use select control for variants
      options: ['default', 'animated'], // Define available variants
      description: 'Button style variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    onClick: { action: 'clicked' }, // Log clicks in Storybook actions panel
  },
  tags: ['autodocs'], // Enable automatic documentation generation
};

export default meta;
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
    disabled: false,
  },
};

// Animated story
export const Animated: Story = {
  args: {
    children: 'Animated Border',
    variant: 'animated',
    disabled: false,
  },
};

// Disabled story (applies to default style)
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'default',
    disabled: true,
  },
}; 