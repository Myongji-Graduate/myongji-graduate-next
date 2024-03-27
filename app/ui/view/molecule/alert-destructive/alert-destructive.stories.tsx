import type { Meta, StoryObj } from '@storybook/react';

import AlertDestructive from './alert-destructive';

const meta = {
  title: 'ui/view/molecule/AlertDestructive',
  component: AlertDestructive,
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
