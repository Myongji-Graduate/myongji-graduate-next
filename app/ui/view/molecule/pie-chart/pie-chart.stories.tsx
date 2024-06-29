import type { Meta, StoryObj } from '@storybook/react';
import PieChart, { PieChartProp } from './pie-chart';

const meta = {
  title: 'ui/view/molecule/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '원형 차트 컴포넌트이며 이수율(percentage)을 나타낼때 사용됩니다',
  },
  argTypes: {
    percentage: {
      description: '이수율을 나타냅니다',
    },
  },
} as Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 20,
  },
  render: (args: PieChartProp) => <PieChart {...args} />,
};
