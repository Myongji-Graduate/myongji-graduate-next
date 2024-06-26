import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { mockDatabase, resetMockDB } from '@/app/mocks/db.mock';
import TakenLectureList from './taken-lecture-list';
import TakenLectureAtomHydrator from '@/app/store/stores/taken-lecture-atom-hydrator';
import { screen } from '@storybook/testing-library';
import { delay } from 'msw';

const meta = {
  title: 'ui/lecture/taken-lecture',
  component: TakenLectureList,
  decorators: [
    (Story) => {
      resetMockDB();
      const data = mockDatabase.getTakenLectures();
      return (
        <TakenLectureAtomHydrator initialValue={data.takenLectures}>
          <Story />
        </TakenLectureAtomHydrator>
      );
    },
  ],
} as Meta<typeof TakenLectureList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DeleteSenario: Story = {
  play: async ({ step }) => {
    await step('사용자가 삭제를 클릭하면 alert창이 보여진다', async () => {
      const deleteButton = await screen.findAllByTestId('taken-lecture-delete-button');
      await userEvent.click(deleteButton[0]);

      expect(screen.getByText('과목을 삭제하시겠습니까?')).toBeInTheDocument();
    });
    await step('확인 버튼을 클릭하면 과목이 삭제된다', async () => {
      const confirmButton = await screen.findAllByTestId('confirm-button');
      await userEvent.click(confirmButton[0]);

      await delay(3000);

      expect(screen.queryByText('인공지능')).not.toBeInTheDocument();
    });
  },
};
