import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import clsx from 'clsx';

import type { MenuItem, SidebarMenuProps } from './SidebarMenu.types';

const NavItem = ({ item, depth = 0 }: { item: MenuItem; depth?: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-full">
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={clsx(
          'w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200',
          depth > 0 && 'text-sm pl-8'
        )}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-blue-500">{item.icon}</span>}
          <span className="font-medium">{item.label}</span>
        </div>
        {hasChildren && (
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <FaChevronDown className="w-3 h-3 opacity-50" />
          </motion.div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {item.children?.map((child) => (
              <NavItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  items,
  title = 'Menu',
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998 m-0"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={clsx(
              'fixed inset-y-0 right-0 w-80 z-9999 m-0 shadow-2xl',
              'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl',
              'border-l border-white/20 dark:border-gray-800',
              'p-8 flex flex-col'
            )}
          >
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black uppercase tracking-tighter dark:text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {items.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 text-[10px] text-center text-gray-400 uppercase tracking-[0.2em] font-bold">
              © 2025 Component Library Systems
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
};
