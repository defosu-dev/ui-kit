import React from 'react';
import clsx from 'clsx';

import type { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center px-6 py-3',
        'bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold',
        'shadow-lg shadow-blue-500/30 transition-all active:scale-95',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
