import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import TextInput from './text-input';

const meta = {
  title: 'ui/view/atom/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// fix: border 색깔 왜이럼?
export const Default: Story = {
  args: {
    defaultValue: '',
  },
};

// fix: 색 안변함
export const Disabled: Story = {
  args: {
    defaultValue: '',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    defaultValue: 'asd',
  },
};

export const WithIcon: Story = {
  args: {
    defaultValue: '',
    icon: MagnifyingGlassIcon,
  },
};

export const WithError: Story = {
  args: {
    defaultValue: '',
    error: true,
    errorMessage: 'error message',
  },
};

export const WithPlaceholder: Story = {
  args: {
    defaultValue: '',
    placeholder: 'placeholder',
  },
};
