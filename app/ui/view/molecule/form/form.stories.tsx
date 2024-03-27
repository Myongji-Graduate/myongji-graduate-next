import type { Meta, StoryObj } from '@storybook/react';

import Form from '.';
import { userEvent, within } from '@storybook/testing-library';
import { FormState } from './form-root';
import { z } from 'zod';

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

const SignUpFormMockSchema = z
  .object({
    authId: z
      .string()
      .min(6, {
        message: 'User ID must be at least 6 characters',
      })
      .max(20, {
        message: 'User ID must be at most 20 characters',
      }),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!^%*#?&])[A-Za-z\d@$!^%*#?&]{8,}$/, {
      message: 'Password must contain at least 8 characters, one letter, one number and one special character',
    }),
    confirmPassword: z.string(),
    studentNumber: z.string().length(8, { message: '학번은 8자리 입니다' }).startsWith('60', {
      message: '학번은 60으로 시작합니다',
    }),
    engLv: z.enum(['basic', 'level12', 'level34', 'bypass']),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  });

async function mockFormAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = SignUpFormMockSchema.safeParse({
    authId: formData.get('authId'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    studentNumber: formData.get('studentNumber'),
    engLv: formData.get('engLv'),
  });

  if (!validatedFields.success) {
    return {
      isSuccess: false,
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
    isSuccess: false,
    isFailure: true,
    validationError: {},
    message: '이미 존재하는 계정입니다.',
  };
}

const SingUpFormTemplate: Story = {
  render: () => {
    return (
      <Form action={mockFormAction} id="회원가입">
        <Form.TextInput required={true} label="아이디" id="authId" placeholder="6자 이상 20자 이하" />
        <Form.PasswordInput
          required={true}
          label="비밀번호"
          id="password"
          placeholder="특수문자(!@#$%^&*), 문자, 숫자를 포함한 8자 이상 20자 이하"
        />
        <Form.PasswordInput required={true} label="비밀번호 확인" id="confirmPassword" placeholder="" />
        <Form.NumberInput required={true} label="학번" id="studentNumber" placeholder="ex)60xxxxxx" />
        <Form.Select
          required={true}
          label="영어"
          id="engLv"
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
