import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
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
    const hasBothButtons = hasClearButton && hasEyeButton;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      rest.onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue('');
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      rest.onChange?.(event);

      if (ref) {
        if (typeof ref === 'function') {
          // нічого не робимо для callback ref
        } else {
          ref.current?.focus();
        }
      }
    };

    const inputType = isPassword && showPassword ? 'text' : type;

    // padding-right залежить від кількості кнопок
    let prClass = 'pr-4';
    if (hasBothButtons) prClass = 'pr-16';
    else if (hasClearButton || hasEyeButton) prClass = 'pr-10';

    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={clsx(
          'relative',
          className.includes('w-full') ? 'w-full' : 'inline-block'
        )}
      >
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'block px-4 py-3 rounded-xl text-base transition-all duration-200',
            'bg-white text-gray-900 placeholder-gray-500 border border-gray-300',
            'focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500',
            'dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:border-gray-700',
            'dark:focus:ring-blue-400/30 dark:focus:border-blue-400',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            prClass,
            className
          )}
          {...rest}
        />

        {(hasClearButton || hasEyeButton) && (
          <div className="absolute inset-y-0 right-3 flex items-center space-x-1 my-2">
            {hasClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600
               dark:text-gray-200 dark:hover:text-white
               dark:bg-gray-700 dark:hover:bg-gray-600
               dark:border dark:border-gray-400 border border-transparent
               transition-colors duration-150"
                aria-label="Clear input"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
            {hasEyeButton && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600
               dark:text-gray-200 dark:hover:text-white
               dark:bg-gray-700 dark:hover:bg-gray-600
               dark:border dark:border-gray-400 border border-transparent
               transition-colors duration-150"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';
