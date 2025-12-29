import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AnimatePresence } from 'framer-motion';

import { Button } from '../Button/Button';

import { Toast } from './Toast';
import type { ToastProps, ToastVariant } from './Toast.types';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    duration: { control: 'number' },
    title: { control: 'text' },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastShowcase = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#1a1a1a] p-6 transition-colors duration-300">
    <div className="mb-8 text-center">
      <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-widest">
        {title}
      </h1>
      <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full" />
    </div>
    <div className="w-full max-w-sm flex justify-center">{children}</div>
  </div>
);

export interface ToastItem {
  id: number;
  text: string;
  variant: ToastVariant;
  title?: string;
}

const ToastManager = (args: ToastProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = () => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        id,
        text: args.message,
        variant: args.variant || 'info',
        title: args.title,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastShowcase title="Toast Notifications">
      <div className="text-center space-y-4">
        <h3 className="text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">
          Current variant:{' '}
          <span className="uppercase font-bold text-blue-500">
            {args.variant}
          </span>
        </h3>
        <Button onClick={addToast}>Show Notification</Button>
      </div>
      <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end pointer-events-none w-full max-w-100">
        <div className="pointer-events-auto w-full flex flex-col items-end">
          <AnimatePresence mode="popLayout">
            {toasts.map((t) => (
              <Toast
                key={t.id}
                {...args}
                variant={t.variant}
                title={t.title}
                message={`${t.text} (ID: ${t.id.toString().slice(-4)})`}
                onClose={() => removeToast(t.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastShowcase>
  );
};

export const Success: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'success',
    title: 'Update 2025',
    message: 'System successfully updated to latest version.',
    duration: 4000,
  },
};

export const Error: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'error',
    title: 'Connection Lost',
    message: 'Could not connect to the secure server.',
    duration: 5000,
  },
};

export const Warning: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'warning',
    title: 'Security Notice',
    message: 'Your password expires in 2 days.',
    duration: 0,
  },
};

export const Info: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'info',
    title: 'New Message',
    message: 'You have a new notification in your inbox.',
    duration: 3000,
  },
};
