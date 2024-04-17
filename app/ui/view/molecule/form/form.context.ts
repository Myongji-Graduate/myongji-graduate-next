import { createContext } from 'react';

interface FormContext {
  formId: string;
  errors: Record<string, string[] | undefined>;
  isSuccess: boolean;
}

export const FormContext = createContext<FormContext>({
  formId: '',
  errors: {},
  isSuccess: false,
});
