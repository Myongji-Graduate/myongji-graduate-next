import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';

const meta = {
  title: 'ui/view/molecule/Form',
  component: Form,
} as Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormTemplate: Story = {
  render: () => {
    return (
      <Form>
        <Form.TextInput label="이름" id="name" placeholder="text input" />
        <Form.TextInput label="이름2" id="name1" placeholder="text input" />
        <Form.TextInput label="이름3" id="name2" placeholder="text input" />
      </Form>
    );
  },
};

export const Default = {
  ...FormTemplate,
};
