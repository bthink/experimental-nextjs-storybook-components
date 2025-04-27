import React from "react";
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper function combining clsx and twMerge (often named cn)
const cn = (...inputs: (string | undefined | null | false)[]) => {
  return twMerge(clsx(inputs));
}

// Define the keyframe animation style
const floatGradientAnimation = `
  @keyframes floatGradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

interface GradientSplashBackgroundProps {
  /** Array of CSS color strings to use in the gradient */
  colors?: string[];
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

  // Construct animation style for inline styling when animated
  const animationStyle = animated ? {
    animation: 'floatGradient 15s ease-in-out infinite alternate'
  } : {};

  // Remove the flex alignment from Tailwind classes
  const basePositionClasses = `absolute inset-0`; 

  // Define inline styles for flex centering based on props
  const contentContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: items, // Use prop value directly (maps well to CSS)
    justifyContent: justify, // Use prop value directly (maps well to CSS)
    height: '100%' // Explicitly set height to ensure vertical alignment works
  };

  return (
    <>
      {/* Add the keyframe definition with a style tag */}
      {animated && (
        <style dangerouslySetInnerHTML={{ __html: floatGradientAnimation }} />
      )}
      
      <div
        className={cn(
          'relative overflow-hidden min-h-[300px] w-full rounded-lg',
          className
        )}
        style={{
          ...combinedStyle,
          ...animationStyle
        }}
      >
        {/* Optional noise overlay */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-soft-light"></div>
        
        {/* Content container with inline styles for centering */}
        <div 
          className={cn("z-10", basePositionClasses)} 
          style={contentContainerStyle} // Apply inline styles
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default GradientSplashBackground;