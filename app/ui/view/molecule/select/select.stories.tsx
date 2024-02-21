import type { Meta, StoryObj } from '@storybook/react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

import Select from '.';

const meta = {
  title: 'ui/view/molecule/Select',
  component: Select,
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
  errorMessage?: string;
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
    errorMessage: 'error message',
  },
};
