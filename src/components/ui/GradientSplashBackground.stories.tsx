import type { Meta, StoryObj } from '@storybook/react';
import GradientSplashBackground from './GradientSplashBackground';
import React from 'react'; // Import React for JSX

const meta: Meta<typeof GradientSplashBackground> = {
  title: 'UI/GradientSplashBackground',
  component: GradientSplashBackground,
  argTypes: {
    colors: {
      control: 'object', // Use object control for array of strings
      description: 'Array of CSS color strings for the gradient',
    },
    children: {
      control: 'text', // Simple text control for children in Storybook
      description: 'Content to display on the background',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GradientSplashBackground>;

// Default story using default colors - forcing height via inline style
export const Default: Story = {
  args: {
    children: <span className="text-white text-4xl font-bold">Hello World!</span>,
    // We can remove className here if we are forcing style
    // className: 'h-80', 
  },
  // Use the render function to apply an inline style
  render: (args) => (
    <GradientSplashBackground {...args} style={{ minHeight: '300px', border: '2px solid red' }} />
    // Added red border for visibility
  ),
};

// Story with custom colors
export const CustomColors: Story = {
  args: {
    colors: ['#4ade80', '#facc15', '#22d3ee', '#f472b6'], // Example: Green, Yellow, Cyan, Pink
    children: <span className="text-gray-900 text-3xl italic">Custom Gradient</span>,
  },
};

// Story showing how to adjust container size via className
export const DifferentSize: Story = {
  args: {
    children: <span className="text-white text-xl">Smaller Container</span>,
    className: 'h-48 w-96', // Override default height and width
  },
};
