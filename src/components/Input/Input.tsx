import { forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      clearable = false,
      className = '',
      placeholder = 'Enter text...',
      disabled = false,
      error,
      label,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState('');

    const isControlled = rest.value !== undefined;
    const value = isControlled ? rest.value : internalValue;

    const isPassword = type === 'password';
    const hasValue = value != null && value.toString().length > 0;
    const hasClearButton = clearable && hasValue && !disabled;
    const hasEyeButton = isPassword && !disabled;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      rest.onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue('');
      const mockEvent = {
        target: { ...rest, value: '' },
        currentTarget: { ...rest, value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      rest.onChange?.(mockEvent);

      if (ref && typeof ref !== 'function' && ref.current) {
        ref.current.focus();
      }
    };

    const inputType = isPassword && showPassword ? 'text' : type;
    let prClass = 'pr-4';
    if (hasClearButton && hasEyeButton) prClass = 'pr-20';
    else if (hasClearButton || hasEyeButton) prClass = 'pr-12';

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          'flex flex-col gap-2',
          typeof className === 'string' && className.includes('w-full')
            ? 'w-full'
            : 'w-80',
          className
        )}
      >
        {label && (
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 tracking-tight">
            {label}
          </label>
        )}

        <div className="relative group">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(
              'block w-full px-5 py-3.5 rounded-2xl text-base transition-all duration-300 outline-none',
              // Стиль "як у Toast" - Glassmorphism
              'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md',
              'text-gray-900 dark:text-white border-2',
              'shadow-lg shadow-black/5 dark:shadow-black/20',
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
                : 'border-white dark:border-gray-700 focus:border-blue-500/50 dark:focus:border-blue-400/50 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10',
              'placeholder-gray-400 dark:placeholder-gray-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              prClass
            )}
            {...rest}
          />

          <div className="absolute inset-y-0 right-3 flex items-center gap-1">
            <AnimatePresence mode="popLayout">
              {hasClearButton && (
                <motion.button
                  key="clear"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                  type="button"
                  onClick={handleClear}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                >
                  <FaTimes className="w-4 h-4" />
                </motion.button>
              )}

              {hasEyeButton && (
                <motion.button
                  key="eye"
                  layout
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs font-bold text-red-500 ml-2 mt-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

Input.displayName = 'Input';
