'use server';

import { State } from '@/app/ui/view/molecule/form/form-root';
import { z } from 'zod';

const SimpleSignUpFormSchema = z
  .object({
    studentNumber: z.string(),
    name: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    console.log('refind', confirmPassword, password);
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });

type User = z.infer<typeof SimpleSignUpFormSchema>;

export async function createUser(prevState: State, formData: FormData): Promise<State> {
  // Validate form fields using Zod
  const validatedFields = SimpleSignUpFormSchema.safeParse({
    studentNumber: formData.get('studentNumber'),
    name: formData.get('name'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  console.log(validatedFields);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'error',
    };
  }

  return {
    errors: {},
    message: 'blacnk',
  };
}
