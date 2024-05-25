import type { Meta, StoryObj } from '@storybook/react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

import Select from '.';

const meta = {
  title: 'ui/view/molecule/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: '- Select의 하위 컴포넌트로 Select Item이 존재합니다',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Select의 placeholder을 설정할 수 있습니다',
    },
    defaultValue: {
      description: '기본 value값을 설정할 수 있습니다',
    },
    name: {
      description: 'name을 설정할 수 있습니다',
    },
    icon: {
      description: 'icon을 설정할 수 있습니다',
    },
    error: {
      description: 'error여부를 설정할 수 있습니다',
    },
    errorMessages: {
      description: 'error시 노출할 메세지들을 배열에 담아 할당할 수 있습니다',
    },
    disabled: {
      description: 'disabled 여부를 설정할 수 있습니다',
    },
    children: {
      description: 'select 내부 요소를 설정할 수 있습니다',
    },
    required: {
      description: '필수로 할당이 되어야 하는지 설정할 수 있습니다',
    },
    onValueChange: {
      description: 'value가 바뀌었을 때마다 실행할 함수를 설정할 수 있습니다',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-52">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

type SelectTemplateProps = {
  placeholder: string;
  defaultValue?: string;
  icon?: React.ElementType;
  error?: boolean;
  errorMessages?: string[];
  disabled?: boolean;
};

const SelectTemplate: Story = {
  render: ({ placeholder, ...arg }: SelectTemplateProps) => {
    return (
      <Select placeholder={placeholder} {...arg}>
        <Select.Item value="1" placeholder="data1" />
        <Select.Item value="2" placeholder="data2" />
        <Select.Item value="3" placeholder="data3" />
      </Select>
    );
  },
};

export const Default = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
  },
};

export const Disabled = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
    disabled: true,
  },
};

export const WithDefaultValue = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
    defaultValue: '2',
  },
};

export const WithIcon = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
    icon: ShieldExclamationIcon,
  },
};

export const WithError = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
    error: true,
    errorMessages: ['error message'],
  },
};

export const WithErrors = {
  ...SelectTemplate,
  args: {
    placeholder: 'Select..',
    error: true,
    errorMessages: ['error message', 'error message'],
  },
};
