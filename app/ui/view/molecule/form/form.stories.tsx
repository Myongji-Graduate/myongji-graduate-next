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
        <Form.TextInput label="아이디" id="userId" placeholder="6자 이상 20자 이하" />
        <Form.PasswordInput label="비밀번호" id="password" placeholder="기호(!@#$%^&*)를 포함한 8자 이상 20자 이하" />
        <Form.PasswordInput label="비밀번호 확인" id="confirmPassword" placeholder="" />
        <Form.NumberInput label="학번" id="studentNumber" placeholder="ex)60xxxxxx" />
        <Form.Select
          label="영어"
          id="english"
          placeholder="선택하세요"
          options={[
            { value: 'basic', placeholder: '기초영어' },
            { value: 'level12', placeholder: 'Level12' },
            { value: 'level34', placeholder: 'Level34' },
            { value: 'bypass', placeholder: '면제' },
          ]}
        />
        <Form.SubmitButton label="회원가입" position="center" variant="secondary" />
      </Form>
    );
  },
};

export const Default = {
  ...FormTemplate,
};
