import type { Meta, StoryObj } from '@storybook/react';
import { SidebarMenu } from './SidebarMenu';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';

const meta: Meta<typeof SidebarMenu> = {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

const SidebarShowcase = ({
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

const menuData = [
  { id: '1', label: 'Overview', icon: <FaHome /> },
  {
    id: '2',
    label: 'Analytics',
    icon: <FaChartBar />,
    children: [
      { id: '2-1', label: 'Real-time' },
      { id: '2-2', label: 'Reports' },
    ],
  },
  { id: '3', label: 'Settings', icon: <FaCog /> },
];

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <SidebarShowcase title="Navigation Menu">
        <Button onClick={() => setIsOpen(true)}>Open Sidebar</Button>
        <SidebarMenu
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </SidebarShowcase>
    );
  },
  args: {
    title: 'Admin 2025',
    items: menuData,
  },
};

export const NestedLevels: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <SidebarShowcase title="Multi-level Menu">
        <Button onClick={() => setIsOpen(true)}>Check Hierarchy</Button>
        <SidebarMenu
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </SidebarShowcase>
    );
  },
  args: {
    title: 'Project Files',
    items: [
      {
        id: '1',
        label: 'Source',
        children: [
          {
            id: '1-1',
            label: 'Components',
            children: [
              { id: '1-1-1', label: 'Button.tsx' },
              { id: '1-1-2', label: 'Input.tsx' },
            ],
          },
        ],
      },
    ],
  },
};
