import type { Meta, StoryObj } from '@storybook/react';

import SignUpForm from './sign-up-form';

import { userEvent, within, expect, fn, waitFor } from '@storybook/test';
import { resetMockDB } from '@/app/mocks/data';

const meta = {
  title: 'ui/user/SignUpForm',
  component: SignUpForm,
  args: {
    onNext: fn(),
  },
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

export const SuccessSenario: Story = {
  play: async ({ args, canvasElement, step }) => {
    resetMockDB();
    const canvas = within(canvasElement);

    await step('사용자가 양식에 맞춰서 폼을 입력하면', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234!');
      await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'test1234!');
      await userEvent.type(canvas.getByLabelText('학번'), '60000001');
      await userEvent.selectOptions(canvas.getByLabelText('영어'), 'basic');

      await userEvent.click(canvas.getByText('회원가입'));
    });

    await step('회원가입에 성공한다', async () => {
      await waitFor(() => expect(args.onNext).toHaveBeenCalled());
    });
  },
};

export const FailureSenarioWithValidation: Story = {
  play: async ({ args, canvasElement, step }) => {
    resetMockDB();
    const canvas = within(canvasElement);

    await step('사용자가 양식에 맞춰서 폼을 입력하지 않으면', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'test');
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234');
      await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'test1234!');
      await userEvent.type(canvas.getByLabelText('학번'), '600000');
      await userEvent.selectOptions(canvas.getByLabelText('영어'), 'basic');

      await userEvent.click(canvas.getByText('회원가입'));
    });

    await step('유효성 검사에 실패한다.', async () => {
      await waitFor(() => {
        expect(args.onNext).not.toHaveBeenCalled();
        expect(canvas.getByText('양식에 맞춰 다시 입력해주세요.')).toBeInTheDocument();
        expect(canvas.getByText('아이디는 6자 이상 20자 이하여야 합니다.')).toBeInTheDocument();
        expect(canvas.getByText('비밀번호는 문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.')).toBeInTheDocument();
        expect(canvas.getByText('비밀번호가 일치하지 않습니다.')).toBeInTheDocument();
        expect(canvas.getByText('학번은 8자리여야 합니다.')).toBeInTheDocument();
      });
    });
  },
};

export const FailureSenarioWithDuplicatedStudentNumber: Story = {
  play: async ({ args, canvasElement, step }) => {
    resetMockDB();
    const canvas = within(canvasElement);

    await step('사용자가 중복된 학번으로 회원가입을 시도하면', async () => {
      await userEvent.type(canvas.getByLabelText('아이디'), 'testtest');
      await userEvent.type(canvas.getByLabelText('비밀번호'), 'test1234!');
      await userEvent.type(canvas.getByLabelText('비밀번호 확인'), 'test1234!');
      await userEvent.type(canvas.getByLabelText('학번'), '60000000');
      await userEvent.selectOptions(canvas.getByLabelText('영어'), 'basic');

      await userEvent.click(canvas.getByText('회원가입'));
    });

    await step('회원가입에 실패한다.', async () => {
      await waitFor(() => {
        expect(args.onNext).not.toHaveBeenCalled();
        expect(canvas.getByText('이미 가입된 학번입니다.')).toBeInTheDocument();
      });
    });
  },
};
