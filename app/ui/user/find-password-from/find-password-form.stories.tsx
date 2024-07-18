import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within, expect, waitFor } from '@storybook/test';
import FindPasswordForm from './find-password-form';

const meta = {
  title: 'ui/user/FindPasswordForm',
  component: FindPasswordForm,
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
} as Meta<typeof FindPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessSenario: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('재설정할 비밀번호와 확인용 비밀번호를 입력받는다.', async () => {
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'admin1234!');
      await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'admin1234!');

      await userEvent.click(canvas.getByText('변경하기'));
    });

    await step('비밀번호 변경에 성공한다', async () => {
      await waitFor(() => expect(canvas.queryByText('비밀번호 변경에 실패했습니다.')).toBeNull());
    });
  },
};

export const FailureSenarioWithValidation: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('재설정할 비밀번호와 확인용 비밀번호를 다르게 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'admin1234');
      await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'admin1234!');

      await userEvent.click(canvas.getByText('변경하기'));
    });

    await step('유효성 검사에 실패한다', async () => {
      expect(canvas.getByText('비밀번호는 문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.')).toBeInTheDocument();
      expect(canvas.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
    });
  },
};
