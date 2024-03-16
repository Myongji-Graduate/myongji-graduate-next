import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm from './sign-up-form';

import { userHandlers } from '@/app/mocks/handlers/user-handler.mock';

const meta = {
  title: 'ui/user/SignUpForm',
  component: SignUpForm,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MockedSuccess: Story = {
  parameters: {
    msw: [...userHandlers],
  },
};
