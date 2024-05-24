import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta = {
  title: 'ui/view/atom/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
- src 값으로 이미지 경로를 할당할 수 있습니다.\n
`,
      },
    },
  },
} as Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: './assets/profile-image.png',
  },
};
