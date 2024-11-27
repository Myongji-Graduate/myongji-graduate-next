import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within, expect, fn, waitFor } from '@storybook/test';
import { resetMockDB, mockDatabase } from '@/app/mocks/db.mock';
import FindIdForm from './find-id-form';

const meta = {
  title: 'ui/user/FindIdForm',
  component: FindIdForm,
  args: {
    onNext: fn(),
  },
  decorators: [
    (Story) => {
      const beforeEach = () => {
        resetMockDB();
        mockDatabase.createUser({
          authId: 'testtest',
          password: 'test1234!',
          studentNumber: '60000000',
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
} as Meta<typeof FindIdForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SuccessSenario: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('가입한 사용자의 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('학번'), '60000000');
      await userEvent.click(canvas.getByText('아이디찾기'));
    });

    await step('아이디 찾기에 성공한다', async () => {
      await waitFor(() => expect(args.onNext).toHaveBeenCalled());
    });
  },
};

export const FailureScenarioWithoutUser: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('사용자가 존재하지 않는 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('학번'), '50002230');
      await userEvent.click(canvas.getByText('아이디찾기'));
    });

    await step('로그인에 실패한다', async () => {
      expect(await canvas.findByText('해당 사용자를 찾을 수 없습니다.')).toBeInTheDocument();
    });
  },
};

export const FailureSenarioWithValidation: Story = {
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('사용자가 양식에 맞지않는 학번을 입력한다.', async () => {
      await userEvent.type(canvas.getByLabelText('학번'), '6000020');
      await userEvent.click(canvas.getByText('아이디찾기'));
    });

    await step('유효성 검사에 실패한다', async () => {
      expect(canvas.getByText('학번이 8글자가 맞는지 확인해주세요.')).toBeInTheDocument();
    });
  },
};
