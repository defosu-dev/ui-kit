import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { AnimatePresence } from 'framer-motion';

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

const ToastManager = (args: any) => {
  const [toasts, setToasts] = useState<
    { id: number; text: string; title?: string; variant: any }[]
  >([]);

  const addToast = () => {
    const id = Date.now();
    setToasts((prev) => [
      ...prev,
      {
        id,
        text: args.message,
        title: args.title,
        variant: args.variant,
      },
    ]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-300">
      <div className="text-center space-y-4 z-10">
        <h3 className="text-gray-500 dark:text-gray-400 mb-2">
          Click to test toast notification
        </h3>
        <button
          onClick={addToast}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
        >
          Show {args.variant} Toast
        </button>
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
    </div>
  );
};

export const Success: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'success',
    title: 'Successfully saved!',
    message: 'Your profile has been updated.',
    duration: 1000,
    showCloseButton: false,
  },
};

export const Error: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'error',
    title: 'Upload failed',
    message: 'File size exceeds the 10MB limit.',
    duration: 5000,
  },
};

export const Warning: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'warning',
    title: 'Storage almost full',
    message: 'You have used 90% of your space.',
    duration: 0,
  },
};

export const Info: Story = {
  render: (args) => <ToastManager {...args} />,
  args: {
    variant: 'info',
    title: 'New Update',
    message: 'A new version is available for download.',
    duration: 3000,
  },
};
