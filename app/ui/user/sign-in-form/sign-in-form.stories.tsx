import type { Meta, StoryObj } from '@storybook/react';

import SignInForm from './sign-in-form';

import { userEvent, within, expect, fn, waitFor } from '@storybook/test';
import { mockDatabase } from '@/app/mocks/db.mock';
import { resetMockDB } from '@/app/mocks/data';

const meta = {
  title: 'ui/user/SignInForm',
  component: SignInForm,
  decorators: [
    (Story) => {
      const beforeEach = () => {
        resetMockDB();
        mockDatabase.createUser({
          authId: 'testtest',
          password: 'test1234!',
          studentNumber: '60000001',
          engLv: 'ENG12',
        });
      };
      beforeEach();
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
} as Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessSenario: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('사용자가 양식에 맞춰서 폼을 입력하면', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234!');

      await userEvent.click(canvas.getByText('로그인'));
    });

    await step('로그인에 성공한다', async () => {
      await waitFor(() => expect(canvas.queryByText('아이디 또는 비밀번호가 일치하지 않습니다.')).toBeNull());
    });
  },
};

export const FailureScenarioWithoutUser: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('사용자가 존재하지 않는 아이디로 로그인하면', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'test');
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234');

      await userEvent.click(canvas.getByText('로그인'));
    });

    await step('로그인에 실패한다', async () => {
      expect(await canvas.findByText('아이디 또는 비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
    });
  },
};
