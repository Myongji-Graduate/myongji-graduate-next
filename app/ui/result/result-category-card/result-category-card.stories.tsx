import type { Meta, StoryObj } from '@storybook/react';
import ResultCategoryCard from './result-category-card';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

const meta = {
  title: 'ui/result/category-card',
  component: ResultCategoryCard,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '성적 카테고리에 대한 요약정보를 노출할 때 사용하는 컴포넌트로 결과페이지에서 사용됩니다.',
  },
  argTypes: {
    category: {
      description: '성적 카테고리의 분류를 표시합니다.',
      options: RESULT_CATEGORY,
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
    completed: {
      description: '카테고리의 충족 여부를 표시합니다.',
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [(Story) => <Story />],
} as Meta<typeof ResultCategoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: RESULT_CATEGORY.COMMON_CULTURE,
    totalCredit: 40,
    takenCredit: 30,
    completed: false,
  },
};

export const CompletedSubMajor: Story = {
  args: {
    category: RESULT_CATEGORY.SUB_MAJOR,
    totalCredit: 40,
    takenCredit: 40,
    completed: true,
  },
};

export const UncompletedDualMajor = {
  args: {
    category: RESULT_CATEGORY.DUAL_BASIC_ACADEMICAL_CULTURE,
    totalCredit: 70,
    takenCredit: 40,
    completed: false,
  },
};
