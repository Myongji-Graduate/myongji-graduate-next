'use server';

import { State } from '@/app/ui/view/molecule/form/form-root';
import { z } from 'zod';

const SimpleSignUpFormSchema = z.object({
  studentNumber: z.number({
    invalid_type_error: 'Please enter your student number.',
  }),
  name: z.string({
    invalid_type_error: 'Please enter your user ID.',
  }),
  // password: z.string(),
  // amount: z.coerce
  //   .number()
  //   .gt(0, { message: 'Please enter an amount greater than $0.' }),
  // status: z.enum(['pending', 'paid'], {
  //   invalid_type_error: 'Please select an invoice status.',
  // }),
  // date: z.string(),
});

type User = z.infer<typeof SimpleSignUpFormSchema>;

export async function createUser(prevState: State, formData: FormData): Promise<State> {
  // Validate form fields using Zod
  console.log('formData', formData.get('studentNumber'));
  console.log('formData', formData.get('name'));
  const validatedFields = SimpleSignUpFormSchema.safeParse({
    studentNumber: formData.get('studentNumber'),
    name: formData.get('name'),
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
