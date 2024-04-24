import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta = {
  title: 'ui/view/atom/Avatar',
  component: Avatar,
} as Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: './assets/profile-image.png',
  },
};
