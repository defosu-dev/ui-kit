import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useForm, Controller } from 'react-hook-form';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const InputShowcase = ({
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

export const Default: Story = {
  render: (args) => (
    <InputShowcase title="Standard Input">
      <Input {...args} />
    </InputShowcase>
  ),
  args: {
    label: 'Username1',
    placeholder: 'Enter your name...dd',
    clearable: true,
    type: 'number',
    error: 'sdfsd',
    className: '',
  },
};

export const Password: Story = {
  render: (args) => (
    <InputShowcase title="Secure Input">
      <Input {...args} />
    </InputShowcase>
  ),
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    clearable: true,
  },
};

export const ErrorState: Story = {
  render: (args) => (
    <InputShowcase title="Validation State">
      <Input {...args} />
    </InputShowcase>
  ),
  args: {
    label: 'Email',
    type: 'email',
    value: 'wrong-email@com',
    error: 'Please enter a valid email address',
  },
};

export const AuthForm: Story = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: { email: '', password: '' },
    });

    return (
      <InputShowcase title="Login Showcase">
        <div className="w-full p-8 bg-white/50 dark:bg-gray-800/40 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white dark:border-gray-700">
          <form
            onSubmit={handleSubmit((d) => alert(JSON.stringify(d)))}
            className="space-y-6"
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="user@example.com"
                  error={errors.email?.message}
                  clearable
                  className="w-full"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  clearable
                  className="w-full"
                />
              )}
            />
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-95">
              Continue
            </button>
          </form>
        </div>
      </InputShowcase>
    );
  },
};
