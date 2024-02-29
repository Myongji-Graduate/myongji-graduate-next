import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { createUser } from '@/app/business/auth/user.command';

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
      <Form action={createUser} id="회원가입">
        <Form.NumberInput label="학번" id="studentNumber" placeholder="number input" />
        <Form.TextInput label="이름" id="name" placeholder="text input" />
        {/* <Form.PasswordInput label="비밀번호" id="password" placeholder="비밀번호" /> */}
        {/* <Form.Select
          label="영어"
          id="english"
          placeholder="선택하세요"
          options={[
            { value: '1', placeholder: 'one' },
            { value: '2', placeholder: 'two' },
            { value: '3', placeholder: 'three' },
          ]}
        /> */}
        <Form.SubmitButton label="회원가입" position="center" variant="secondary" />
      </Form>
    );
  },
};

export const Default = {
  ...FormTemplate,
};
