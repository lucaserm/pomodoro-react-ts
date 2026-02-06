import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'outline', children, className = '', ...props }, ref) => {
    const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-pomodoro-work text-white hover:bg-red-600 shadow-lg hover:shadow-xl',
      secondary: 'bg-pomodoro-rest text-gray-900 hover:bg-teal-400 shadow-lg hover:shadow-xl',
      outline: 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
    };

    return (
      <motion.button 
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props as any}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
