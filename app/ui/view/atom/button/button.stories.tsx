import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta = {
  title: 'ui/view/atom/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'Button은 사용자가 한 번의 탭으로 작업을 수행하고 선택할 수 있는 컴포넌트입니다.',
    docs: {
      description: {
        component: `
- variant값으로 "primary" | "secondary" |  "text" | "delete" 중 하나를 선택할 수 있습니다.\n
- size값으로 "lg" | "md" |  "sm" | "xs" | "default"  중 하나를 선택할 수 있습니다.\n
- label 값으로 button 태그에 존재하는 text를 의미하고 필수적으로 할당해야 합니다
`,
      },
    },
  },
  argTypes: {
    variant: {
      description: 'Button의 Variant를 설정합니다.',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' },
      },
      options: ['primary', 'secondary', 'text', 'delete'],
      control: {
        type: 'radio',
      },
    },
    size: {
      description: 'Button의 size를 설정합니다.',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
      options: ['lg', 'md', 'sm', 'xs', 'default'],
      control: {
        type: 'radio',
      },
    },
    label: {
      description: 'Button의 label을 설정합니다',
      table: {
        type: { summary: 'ButtonLabel' },
        defaultValue: { summary: '' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

export const PrimaryButton: StoryObj<typeof Button> = {
  args: {
    size: 'md',
    variant: 'primary',
    label: '수강현황 자세히보기',
  },
  render: (args) => <Button {...args} />,
};

export const SecondaryButton: StoryObj<typeof Button> = {
  args: {
    size: 'xs',
    variant: 'secondary',
    label: '커스텀하기',
  },
  render: (args) => <Button {...args} />,
};

export const ListActionButton: StoryObj<typeof Button> = {
  args: {
    size: 'default',
    variant: 'list',
    label: '삭제',
  },
  render: (args) => <Button {...args} />,
};

export const TextButton: StoryObj<typeof Button> = {
  args: {
    size: 'default',
    variant: 'text',
    label: '회원탈퇴하기',
  },
  render: (args) => <Button {...args} />,
};
