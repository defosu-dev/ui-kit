import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FaRocket, FaPlus } from 'react-icons/fa';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonShowcase = ({
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
    <div className="w-full max-w-sm flex justify-center items-center gap-4">
      {children}
    </div>
  </div>
);

export const Default: Story = {
  render: (args) => (
    <ButtonShowcase title="Standard Button">
      <Button {...args}>Action Button</Button>
    </ButtonShowcase>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <ButtonShowcase title="Icon Buttons">
      <Button {...args} className="gap-2">
        <FaPlus className="w-3 h-3" />
        Create
      </Button>
      <Button
        {...args}
        className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30"
      >
        Launch
        <FaRocket className="w-3 h-3" />
      </Button>
    </ButtonShowcase>
  ),
};
