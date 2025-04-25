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
    animated: {
      control: 'boolean',
      description: 'Enable/disable background animation',
      defaultValue: true, // Reflect the component default in Storybook UI
    },
    items: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch'],
      description: 'Controls align-items',
      defaultValue: 'center',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Controls justify-content',
      defaultValue: 'center',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GradientSplashBackground>;

// Default story - centered, animated
export const Default: Story = {
  args: {
    children: <span className="text-white text-4xl font-bold">Hello World! (Centered)</span>,
    // items: 'center', // Default
    // justify: 'center', // Default
    // animated: true, // Default
  },
};

// Top-left alignment example
export const TopLeft: Story = {
  args: {
    children: <span className="text-white text-2xl p-4">Top Left</span>, // Added padding for visibility
    items: 'start',
    justify: 'start',
    animated: false, // Disabled animation for clarity
  },
};

// Story with animation explicitly disabled
export const NotAnimated: Story = {
  args: {
    children: <span className="text-white text-4xl font-bold">Hello World! (Static)</span>,
    animated: true,
    // items: 'center', // Default
    // justify: 'center', // Default
  },
};

// Story with custom colors (centered, animated by default)
export const CustomColors: Story = {
  args: {
    colors: ['#4ade80', '#facc15', '#22d3ee', '#f472b6'],
    children: <span className="text-gray-900 text-3xl italic">Custom Gradient (Centered)</span>,
  },
};

// Story showing how to adjust container size via className (centered, animated by default)
export const DifferentSize: Story = {
  args: {
    children: <span className="text-white text-xl">Smaller Container (Centered)</span>,
    className: 'h-48 w-96',
  },
};
