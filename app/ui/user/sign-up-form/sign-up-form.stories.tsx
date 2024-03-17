import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm from './sign-up-form';

import { userEvent, within, expect } from '@storybook/test';
import { userHandlers } from '@/app/mocks/handlers/user-handler.mock';
import { resetMockDB } from '@/app/mocks/db.mock';

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
  parameters: {
    msw: [...userHandlers],
  },
} as Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignUpSucess: Story = {
  play: async ({ canvasElement }) => {
    resetMockDB();
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
    await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234!');
    await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'test1234!');
    await userEvent.type(canvas.getByLabelText('학번'), '60000001');
    await userEvent.selectOptions(canvas.getByLabelText('영어'), 'basic');

    await userEvent.click(canvas.getByText('회원가입'));

    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};
