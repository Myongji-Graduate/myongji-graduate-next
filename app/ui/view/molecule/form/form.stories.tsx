import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { SignUpFormSchema, createUser } from '@/app/business/auth/user.command';
import { userEvent, within } from '@storybook/testing-library';
import { FormState } from './form-root';

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

async function mockFormAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignUpFormSchema.safeParse({
    userId: formData.get('userId'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    studentNumber: formData.get('studentNumber'),
    english: formData.get('english'),
  });

  if (!validatedFields.success) {
    return {
      isFailure: true,
      validationError: validatedFields.error.flatten().fieldErrors,
      message: 'error',
    };
  }

  // Call the API to create a user
  // but now mock the response
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 3000);
  });

  return {
    isFailure: true,
    validationError: {},
    message: '이미 존재하는 계정입니다.',
  };
}

const SingUpFormTemplate: Story = {
  render: () => {
    return (
      <Form action={mockFormAction} id="회원가입">
        <Form.TextInput required={true} label="아이디" id="userId" placeholder="6자 이상 20자 이하" />
        <Form.PasswordInput
          required={true}
          label="비밀번호"
          id="password"
          placeholder="기호(!@#$%^&*)를 포함한 8자 이상 20자 이하"
        />
        <Form.PasswordInput required={true} label="비밀번호 확인" id="confirmPassword" placeholder="" />
        <Form.NumberInput required={true} label="학번" id="studentNumber" placeholder="ex)60xxxxxx" />
        <Form.Select
          required={true}
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

export const SignUpForm: Story = {
  ...SingUpFormTemplate,
};

export const SignUpFormActionWithValidationError: Story = {
  ...SingUpFormTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const userIdInput = canvas.getByLabelText('아이디', {
      selector: 'input',
    });

    await userEvent.type(userIdInput, 'mju', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('비밀번호', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'qw102761', {
      delay: 100,
    });

    const confirmPasswordInput = canvas.getByLabelText('비밀번호 확인', {
      selector: 'input',
    });

    await userEvent.type(confirmPasswordInput, 'qw!102761', {
      delay: 100,
    });

    const studentNumberInput = canvas.getByLabelText('학번', {
      selector: 'input',
    });

    await userEvent.type(studentNumberInput, '6123456', {
      delay: 100,
    });

    await userEvent.selectOptions(canvas.getByLabelText('영어', { selector: 'select' }), 'level12', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('button', { name: 'submit-button' });

    await userEvent.click(submitButton);
  },
};

export const SignUpFormActionWithServerFailure: Story = {
  ...SingUpFormTemplate,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const userIdInput = canvas.getByLabelText('아이디', {
      selector: 'input',
    });

    await userEvent.type(userIdInput, 'mju-graduate', {
      delay: 100,
    });

    const passwordInput = canvas.getByLabelText('비밀번호', {
      selector: 'input',
    });

    await userEvent.type(passwordInput, 'qw!102761', {
      delay: 100,
    });

    const confirmPasswordInput = canvas.getByLabelText('비밀번호 확인', {
      selector: 'input',
    });

    await userEvent.type(confirmPasswordInput, 'qw!102761', {
      delay: 100,
    });

    const studentNumberInput = canvas.getByLabelText('학번', {
      selector: 'input',
    });

    await userEvent.type(studentNumberInput, '60123456', {
      delay: 100,
    });

    await userEvent.selectOptions(canvas.getByLabelText('영어', { selector: 'select' }), 'level12', {
      delay: 100,
    });

    const submitButton = canvas.getByRole('button', { name: 'submit-button' });

    await userEvent.click(submitButton);
  },
};
