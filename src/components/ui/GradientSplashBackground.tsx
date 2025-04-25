import React from "react";
import "./GradientSplashBackground.css"; // Import the CSS file
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function combining clsx and twMerge (often named cn)
const cn = (...inputs: (string | undefined | null | false)[]) => {
  return twMerge(clsx(inputs));
}

interface GradientSplashBackgroundProps {
  /** Array of CSS color strings to use in the gradient */
  colors: string[];
  /** Content to render on top of the background */
  children: React.ReactNode; 
  /** Optional additional class names */
  className?: string;
  /** Allow passing standard React CSSProperties */
  style?: React.CSSProperties;
  /** Controls whether the gradient background animates */
  animated?: boolean; 
  /** Tailwind class suffix for align-items (e.g., 'start', 'center') */
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /** Tailwind class suffix for justify-content (e.g., 'start', 'center', 'between') */
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
}

const GradientSplashBackground: React.FC<GradientSplashBackgroundProps> = ({ 
  colors = ['#ff4785', '#1ea7fd', '#6f2cac'], // Default colors similar to Storybook
  children,
  className,
  style, // Destructure the style prop
  animated = true, // Default animated to true
  items = 'center', // Default alignment
  justify = 'center' // Default alignment
}) => {

  // Generate multiple radial gradient strings from the colors array
  const gradientLayers = colors.map((color, index) => {
    const positionX = (index * 30 + 10) % 100; // Spread gradients horizontally
    const positionY = (index * 40 + 20) % 100; // Spread gradients vertically
    const size = 'ellipse at ' + positionX + '% ' + positionY + '%';
    // Create a blurred radial gradient for each color
    return `radial-gradient(${size}, ${color} 0%, transparent 50%)`;
  }).join(', ');

  // Combine generated background with incoming style prop
  const combinedStyle: React.CSSProperties = {
    // Combine the generated layers
    backgroundImage: gradientLayers,
    // Add a base dark color underneath
    backgroundColor: '#1a1a2e', // Dark base color
    // Conditionally add backgroundSize only if animated
    ...(animated && { backgroundSize: '200% 200%' }), 
    ...style, // Merge incoming style prop
  };

  // Conditionally add animation class
  const animationClass = animated ? 'animate-float-gradient' : '';

  // Construct alignment classes dynamically
  const alignmentClasses = cn(
    `items-${items}`,
    `justify-${justify}`
  );

  return (
    <div
      // Remove hardcoded alignment, add dynamic classes
      className={cn(
        'relative overflow-hidden min-h-[300px] flex w-full rounded-lg', 
        alignmentClasses, // Add dynamic alignment
        animationClass, 
        className // Merge incoming className last
      )}
      style={combinedStyle}
    >
      {/* Optional: Add a subtle grain/noise overlay if desired */}
      {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light"></div> */}
      
      {/* Render children centered on top */}
      <div className="z-10">
        {children}
      </div>
    </div>
  );
};

export default GradientSplashBackground;