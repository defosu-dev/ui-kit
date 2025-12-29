import React, { useEffect, type JSX } from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimes,
} from 'react-icons/fa';
import clsx from 'clsx';

import type { ToastProps, ToastVariant } from './Toast.types';

const variantStyles: Record<
  ToastVariant,
  { border: string; icon: JSX.Element }
> = {
  success: {
    border: 'border-green-500',
    icon: <FaCheckCircle className="w-5 h-5 text-green-500" />,
  },
  error: {
    border: 'border-red-500',
    icon: <FaExclamationCircle className="w-5 h-5 text-red-500" />,
  },
  warning: {
    border: 'border-yellow-500',
    icon: <FaExclamationTriangle className="w-5 h-5 text-yellow-500" />,
  },
  info: {
    border: 'border-blue-500',
    icon: <FaInfoCircle className="w-5 h-5 text-blue-500" />,
  },
};

export const Toast: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  duration = 3000,
  onClose,
  showCloseButton = true,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const { border, icon } = variantStyles[variant];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        'flex items-start p-4 mb-4 min-w-[320px] max-w-md shadow-2xl rounded-2xl border-l-4',
        'bg-white/95 dark:bg-gray-800/95 backdrop-blur-md',
        'text-gray-900 dark:text-gray-100',
        border
      )}
    >
      <div className="shrink-0 mt-0.5">{icon}</div>

      <div className="ml-3 flex-1">
        {title && (
          <h4 className="text-sm font-bold leading-5 mb-1 tracking-tight">
            {title}
          </h4>
        )}
        <p className="text-sm font-medium leading-relaxed opacity-80">
          {message}
        </p>
      </div>

      {showCloseButton && (
        <button
          onClick={onClose}
          className="ml-4 shrink-0 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-all duration-200"
          aria-label="Close"
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>
      )}
    </motion.div>
  );
};
