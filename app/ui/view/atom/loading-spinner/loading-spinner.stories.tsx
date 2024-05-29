import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from './loading-spinner';

const meta = {
  title: 'ui/view/atom/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'LoadingSpinner는 로딩을 나타낼 때 사용되는 spinner 컴포넌트입니다',
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

export const Default: StoryObj<typeof LoadingSpinner> = {
  render: () => (
    <div className="w-100 h-100">
      <LoadingSpinner
        className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
        style={{ transition: `width 150ms` }}
      />
    </div>
  ),
};
