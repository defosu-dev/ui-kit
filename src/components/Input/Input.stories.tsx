import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useForm, Controller } from 'react-hook-form';
import clsx from 'clsx';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    className: { control: 'text' },
  },
  args: {
    placeholder: 'Enter text...',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: 'text',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const PasswordWithClear: Story = {
  args: {
    type: 'password',
    clearable: true,
    placeholder: 'Password with clear',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    clearable: true,
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled',
  },
};

export const CustomWidth: Story = {
  args: {
    placeholder: 'Fixed width input',
    className: 'w-64',
  },
};

export const AuthForm: Story = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => {
    const { control, handleSubmit } = useForm<{
      email: string;
      password: string;
    }>({
      defaultValues: { email: '', password: '' },
    });

    const onSubmit = (data: { email: string; password: string }) => {
      alert(`Success!\n${JSON.stringify(data, null, 2)}`);
    };

    return (
      <div className="w-96 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className="w-full"
                clearable
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className="w-full"
                clearable
              />
            )}
          />
          <button
            type="submit"
            className={clsx(
              'w-full py-3 rounded-xl font-medium text-white',
              'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
              'transition-all duration-200 shadow-md hover:shadow-lg'
            )}
          >
            Login
          </button>
        </form>
      </div>
    );
  },
};
