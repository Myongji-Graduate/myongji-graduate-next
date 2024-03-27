import type { Meta, StoryObj } from '@storybook/react';

import SignInForm from './sign-in-form';

import { userEvent, within, expect, fn, waitFor } from '@storybook/test';
import { resetMockDB } from '@/app/mocks/db.mock';

const meta = {
  title: 'ui/user/SignInForm',
  component: SignInForm,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
