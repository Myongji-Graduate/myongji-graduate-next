import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';

const meta = {
  title: 'ui/view/molecule/Form',
  component: Form,
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormTemplate: Story = {
  render: () => {
    return (
      <Form>
        <Form.TextInput label="이름" id="name" placeholder="text input" />
        <Form.TextInput label="이름2" id="name1" placeholder="text input" />
        <Form.Select
          label="영어"
          id="english"
          placeholder="선택하세요"
          options={[
            { value: '1', placeholder: 'one' },
            { value: '2', placeholder: 'two' },
            { value: '3', placeholder: 'three' },
          ]}
        />
      </Form>
    );
  },
};

export const Default = {
  ...FormTemplate,
};
