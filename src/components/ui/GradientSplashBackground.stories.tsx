import React from 'react';
import GradientSplashBackground from './GradientSplashBackground';

export default {
  title: 'UI/GradientSplashBackground',
  component: GradientSplashBackground,
  argTypes: {
    colors: { control: 'object' },
    children: { control: 'text' },
    className: { control: 'text' },
    animated: { control: 'boolean' },
    items: { 
      control: 'select',
      options: ['start', 'end', 'center', 'baseline', 'stretch']
    },
    justify: { 
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly']
    },
    style: { control: 'object' }
  },
};

// Default story - centered, animated
export const Default = {
  args: {
    colors: ['#ff4785', '#1ea7fd', '#6f2cac'],
    children: (
      <span className="text-white text-4xl font-bold">Hello World! (Centered)</span>
    ),
    items: 'center',
    justify: 'center',
    animated: true,
    style: {
      height: "300px"
    }
  },
};

// Top-left alignment example
export const TopLeft = {
  args: {
    colors: ['#ff4785', '#1ea7fd', '#6f2cac'],
    children: <span className="text-white text-2xl p-4">Top Left</span>,
    items: 'start',
    justify: 'start',
    animated: false,
    style: {
      height: "300px"
    }
  },
};

// Story with animation explicitly disabled
export const NotAnimated = {
  args: {
    colors: ['#ff4785', '#1ea7fd', '#6f2cac'],
    children: (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white text-4xl font-bold">Hello World! (Static)</span>
      </div>
    ),
    animated: false,
    items: 'center',
    justify: 'center',
    style: {
      height: "300px"
    }
  },
};

// Story with custom colors
export const CustomColors = {
  args: {
    colors: ['#4ade80', '#facc15', '#22d3ee', '#f472b6'],
    children: (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-gray-900 text-3xl italic">Custom Gradient (Centered)</span>
      </div>
    ),
    items: 'center',
    justify: 'center',
    style: {
      height: "300px"
    }
  },
};

// Story showing how to adjust container size via className
export const DifferentSize = {
  args: {
    colors: ['#ff4785', '#1ea7fd', '#6f2cac'],
    children: (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white text-xl">Smaller Container (Centered)</span>
      </div>
    ),
    className: 'h-48 w-96',
    items: 'center',
    justify: 'center'
  },
}; 