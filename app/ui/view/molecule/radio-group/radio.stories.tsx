import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import RadioGroup from './radio-group';

const meta: Meta<typeof RadioGroup> = {
  title: 'ui/view/molecule/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupDemo = () => {
  const [value, setValue] = useState('option1');
  return (
    <div className="p-4">
      <RadioGroup
        options={[
          { label: '옵션 1', value: 'option1' },
          { label: '옵션 2', value: 'option2' },
          { label: '옵션 3', value: 'option3' },
        ]}
        value={value}
        onChange={setValue}
      />
      <p className="mt-4 text-sm text-gray-600">선택된 값: {value}</p>
    </div>
  );
};

export const Default: Story = {
  render: () => <RadioGroupDemo />,
};
