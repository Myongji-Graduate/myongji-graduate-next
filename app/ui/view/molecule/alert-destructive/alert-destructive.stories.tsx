import type { Meta, StoryObj } from '@storybook/react';

import AlertDestructive from './alert-destructive';

const meta = {
  title: 'ui/view/molecule/AlertDestructive',
  component: AlertDestructive,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '실패시 노출하는 alert component입니다',
  },
  argTypes: {
    title: {
      description: 'alert의 제목을 설정할 수 있습니다.',
    },
    description: {
      description: 'alert 내용을 설정할 수 있습니다',
    },
  },
} as Meta<typeof AlertDestructive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: 'This is a destructive alert',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Destructive alert',
    description: 'This is a destructive alert',
  },
};
