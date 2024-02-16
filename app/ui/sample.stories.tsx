import type { Meta, StoryObj } from '@storybook/react';
import NavLink from './view/atom/nav-link';

const meta = {
  title: 'components/Button',
  tags: ['autodocs'],
  component: NavLink,
  parameters: {
    componentSubtitle: 'sample ',
    docs: {
      description: {
        component: `
- sample code`,
      },
    },
  },
} satisfies Meta;

export default meta;
export const defaultButton: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: '기본으로 사용되는 default Button입니다.',
      },
    },
  },
  render: (args) => <div>sample</div>,
};
