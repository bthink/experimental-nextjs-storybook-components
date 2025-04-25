import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// import './Button.css'; // Keep CSS import for keyframes and pseudo-element

// Helper function combining clsx and twMerge (often named cn)
const cn = (...inputs: (string | undefined | null | false)[]) => {
  return twMerge(clsx(inputs));
}

// Define classes as clean strings first
const defaultVariantClasses = `
  px-5 py-2.5 text-white bg-blue-600 rounded-lg 
  hover:bg-blue-700 focus:ring-blue-300 
  dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800
`.trim().replace(/\s+/g, ' ');

const animatedVariantClasses = `
  animated-border-button relative overflow-hidden text-sm rounded-lg 
  p-0.5 group bg-transparent text-gray-900 dark:text-white 
  hover:text-white 
  focus:ring-blue-300 dark:focus:ring-blue-800 
`.trim().replace(/\s+/g, ' ');

// Define variants using CVA
const buttonVariants = cva(
  // Base classes applied to the button element
  'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: defaultVariantClasses,
        animated: animatedVariantClasses,
      },
      // Add size variants if needed in the future
      // size: {
      //   default: 'px-5 py-2.5 text-sm',
      //   lg: 'px-6 py-3 text-base',
      // }
    },
    defaultVariants: {
      variant: 'default',
      // size: 'default',
    },
  }
);

// Update ButtonProps to extend CVA variants
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    // No need to redefine variant, it comes from VariantProps
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant, 
  // size, // uncomment if size variants are added
  children, 
  ...props 
}) => {

  // Classes for the inner span of the animated variant
  const animatedInnerClasses = cn(
    'animated-border-button-inner', /* For z-index: 1 */
    'relative', 
    'px-5 py-2.5', /* Inner padding */
    'transition-all ease-in duration-75', 
    'bg-white dark:bg-gray-900', /* Opaque background */
    'rounded-md', /* Inner rounding */
    'group-hover:bg-opacity-0', /* Reveal gradient on hover */
    'text-gray-900 dark:text-white' /* Inner text color */
  );

  return (
    <button
      // Apply CVA variants and merge with incoming className
      className={cn(buttonVariants({ variant /*, size */ }), className)}
      {...props}
    >
      {variant === 'animated' ? (
        // Render inner span structure only for animated variant
        <span className={animatedInnerClasses}>
          {children}
        </span>
      ) : (
        // Render children directly for default variant
        children
      )}
    </button>
  );
};

export default Button; 