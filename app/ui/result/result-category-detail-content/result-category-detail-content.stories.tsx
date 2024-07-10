import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent } from '@storybook/test';
import ResultCategoryDetailContent from './result-category-detail-content';
import { screen } from '@storybook/testing-library';
import { delay } from 'msw';
import { resultCategoryDetailInfo } from '@/app/mocks/data.mock';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

export type ResultCategoryKey = (typeof RESULT_CATEGORY)[keyof typeof RESULT_CATEGORY];

const meta = {
  title: 'ui/result/result-category-detail-content',
  component: ResultCategoryDetailContent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      '성적 카테고리에 대한 기이수/미이수 과목 정보를 노출할 때 사용되는 컴포넌트로 결과페이지에서 사용됩니다.',
  },
  argTypes: {
    category: {
      description: '카테고리의 분류를 표시합니다.',
      options: RESULT_CATEGORY,
    },
    detailCategory: {
      description: '카테고리의 하위에 소속된 하위 카테고리의 분류, 이수 학점, 총 학점, 이수 별 과목정보를 표시합니다.',
    },
    totalCredit: {
      description: '카테고리의 총 학점을 표시합니다.',
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 10,
      },
    },
    takenCredit: {
      description: '카테고리의 이수 학점을 표시합니다.',
      control: {
        type: 'number',
        min: 0,
        max: 100,
        step: 10,
      },
    },
  },
  args: {
    takenCredit: 10,
    totalCredit: 12,
    detailCategory: resultCategoryDetailInfo.detailCategory,
    category: RESULT_CATEGORY.COMMON_CULTURE,
  },
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
