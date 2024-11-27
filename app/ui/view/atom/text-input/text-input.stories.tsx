import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import TextInput from './text-input';

const meta = {
  title: 'ui/view/atom/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <label className="text-xs">
        text-input
        <Story />
      </label>
    ),
  ],
  argTypes: {
    type: {
      description: "Text Input의 type값으로 'text' | 'password' | 'number' 를 할당할 수 있습니다",
      table: {
        type: { summary: 'TextInputType' },
        defaultValue: { summary: 'text' },
      },
      options: ['text', 'password', 'number'],
      control: {
        type: 'radio',
      },
    },
    error: {
      description: 'Text Input의 error여부를 설정합니다',
      table: {
        type: { summary: 'TextInputError' },
        defaultValue: { summary: false },
      },
      options: [true, false],
      control: {
        type: 'radio',
      },
    },
    disabled: {
      description: 'Text Input의 disabeld 여부를 설정합니다',
      table: {
        type: { summary: 'TextInputDisabled' },
        defaultValue: { summary: false },
      },
      options: [true, false],
      control: {
        type: 'radio',
      },
    },
    defaultValue: {
      description: '기본값으로 string | number를 입력할 수 있습니다',
    },
    value: {
      description: 'nput의 value를 control하는 값으로 string | number를 입력할 수 있습니다',
    },
    errorMessages: {
      description: '에러 메세지들을 배열에 담아 할당할 수 있습니다',
    },
    onValueChange: {
      description: 'value가 바뀌었을 때마다 실행되는 함수를 할당할 수 있습니다',
    },
    icon: {
      description: 'input에 icon을 할당할 수 있습니다',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'default',
    value: 'default',
    error: false,
    errorMessages: ['에러메세지1', '에러메세지2'],
    type: 'text',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'Disabled',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    defaultValue: 'asd',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    defaultValue: 123,
  },
};

export const NumberWithPlaceholder: Story = {
  args: {
    type: 'number',
    defaultValue: '',
    placeholder: 'number',
  },
};

export const WithIcon: Story = {
  args: {
    defaultValue: '',
    icon: MagnifyingGlassIcon,
  },
};

export const DisabledWithIcon: Story = {
  args: {
    defaultValue: 'Disabled with icon',
    disabled: true,
    icon: MagnifyingGlassIcon,
  },
};

export const WithError: Story = {
  args: {
    defaultValue: '',
    error: true,
    errorMessages: ['error message'],
  },
};

export const FullTextWithError: Story = {
  args: {
    defaultValue: 'Full text with errorrrrrrrrrrrrrrrrrrrrrrr',
    error: true,
    errorMessages: ['error message'],
  },
};

export const WithErrors: Story = {
  args: {
    defaultValue: '',
    error: true,
    errorMessages: ['error message', 'error message'],
  },
};

export const WithIconAndError: Story = {
  args: {
    defaultValue: '',
    error: true,
    errorMessages: ['error message'],
    icon: MagnifyingGlassIcon,
  },
};

export const WithPlaceholder: Story = {
  args: {
    defaultValue: '',
    placeholder: 'placeholder',
  },
};
