import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within, expect, fn, waitFor } from '@storybook/test';
import { resetMockDB, mockDatabase } from '@/app/mocks/db.mock';
import FindPasswordValidateForm from './find-password-validate-form';

const meta = {
  title: 'ui/user/FindPasswordValidateForm',
  component: FindPasswordValidateForm,
  args: {
    onNext: fn(),
  },
  decorators: [
    (Story) => {
      return (
        <div className="w-96">
          <Story />
        </div>
      );
    },
  ],
} as Meta<typeof FindPasswordValidateForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessSenario: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('가입한 사용자의 아이디와 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'admin');
      await userEvent.type(canvas.getByLabelText('학번'), '60000000');

      await userEvent.click(canvas.getByText('검사하기'));
    });

    await step('사용자 인증에 성공한다', async () => {
      await waitFor(() => expect(args.onNext).toHaveBeenCalled());
    });
  },
};

export const FailureScenarioWithoutUser: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('가입한 사용자의 아이디와 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
      await userEvent.type(canvas.getByLabelText('학번'), '60000200');

      await userEvent.click(canvas.getByText('검사하기'));
    });

    await step('사용자 인증에 실패한다', async () => {
      await waitFor(() => expect(args.onNext).not.toHaveBeenCalled());
    });
  },
};

export const FailureSenarioWithValidation: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('사용자가 양식에 맞지않는 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
      await userEvent.type(canvas.getByLabelText('학번'), '6000200');

      await userEvent.click(canvas.getByText('검사하기'));
    });

    await step('유효성 검사에 실패한다', async () => {
      await waitFor(() => {
        expect(canvas.getByText('학번이 8글자가 맞는지 확인해주세요.')).toBeInTheDocument();
      });
    });
  },
};
