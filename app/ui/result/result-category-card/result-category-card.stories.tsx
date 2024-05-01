import type { Meta, StoryObj } from '@storybook/react';
import ResultCategoryCard from './result-category-card';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';

const meta = {
  title: 'ui/result/category-card',
  component: ResultCategoryCard,
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
