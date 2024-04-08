import type { Meta, StoryObj } from '@storybook/react';

import { userEvent, within } from '@storybook/test';
import { mockDatabase, resetMockDB } from '@/app/mocks/db.mock';
import TakenLectureList from './taken-lecture-list';
import TakenLectureAtomHydrator from '@/app/store/taken-lecture-atom-hydrator';

const meta = {
  title: 'ui/taken-lecture/TakenLecture',
  component: TakenLectureList,
  decorators: [
    (Story) => {
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
  play: async ({ canvasElement, step }) => {
    resetMockDB();
    const canvas = within(canvasElement);

    await step('사용자가 삭제를 클릭하면 alert창이 보여진다', async () => {
      await userEvent.click(canvas.getByTestId('taken-lecture-delete-button'));
    });
  },
};
