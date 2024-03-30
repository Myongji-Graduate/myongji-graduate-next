import type { Meta, StoryObj } from '@storybook/react';
import PieChart, { PieChartProp } from './pie-chart';

const meta = {
  title: 'ui/view/molecule/PieChart',
  component: PieChart,
} as Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    percentage: 20,
  },
  render: (args: PieChartProp) => <PieChart {...args} />,
};
