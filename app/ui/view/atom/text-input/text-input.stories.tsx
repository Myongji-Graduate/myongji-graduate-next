import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import TextInput from './text-input';

const meta = {
  title: 'ui/view/atom/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
- type 값으로 'text' | 'password' | 'number' 를 선택할 수 있습니다 \n
- defaultValue 값으로  string 또는 number를 입력할 수 있습니다.\n
- value 값은 input의 value를 control하는 값으로 string 또는 number를 입력할 수 있습니다\n
- error 값은 error 여부를 boolean으로 나타낼 수 있습니다\n
- errorMessages는 여러 메세지를 배열에 담아 할당할 수 있습니다\n
- onValueChange는 value 가 바뀌었을 때 실행될 함수입니다\n
`,
      },
    },
  },
  argTypes: {
    type: {
      description: 'Text Input의 type을 설정합니다',
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
