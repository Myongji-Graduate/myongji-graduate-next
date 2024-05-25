import type { Meta, StoryObj } from '@storybook/react';

import AlertDestructive from './alert-destructive';

const meta = {
  title: 'ui/view/molecule/AlertDestructive',
  component: AlertDestructive,
  tags: ['autodocs'],
  componentSubtitle: '실패시 노출하는 alert component입니다',
  parameters: {
    docs: {
      description: {
        component: `
- title 값으로 alert의 제목을 설정할 수 있습니다.\n
- description 값으로 alert 내용을 작성할 수 있고 필수값입니다\n
`,
      },
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
