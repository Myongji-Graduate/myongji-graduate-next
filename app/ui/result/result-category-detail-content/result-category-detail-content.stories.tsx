import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import { mockDatabase } from '@/app/mocks/db.mock';
import ResultCategoryDetailContent from './result-category-detail-content';
import { screen } from '@storybook/testing-library';
import { delay } from 'msw';

const meta = {
  title: 'ui/result-category/ResultCategoryDetailContent',
  component: ResultCategoryDetailContent,
  args: { info: mockDatabase.getResultCategoryDetailInfo() },
  decorators: [(Story) => <Story />],
} as Meta<typeof ResultCategoryDetailContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ step }) => {
    await step('미이수 과목을 노출합니다.', async () => {
      await delay(2000);

      expect(screen.getByText('영어2')).toBeInTheDocument();
    });

    await step('토글을 클릭하면 기이수 과목을 노출합니다.', async () => {
      const lectureToggle = await screen.findAllByTestId('lecture-toggle');
      await userEvent.click(lectureToggle[0]);

      await delay(3000);

      expect(screen.queryByText('성서와 인간 이해')).not.toBeInTheDocument();
    });
  },
};
