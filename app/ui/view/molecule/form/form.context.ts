import { createContext } from 'react';

interface FormContext {
  formId: string;
  errors: Record<string, string[] | undefined>;
}

export const FormContext = createContext<FormContext>({
  formId: '',
  errors: {},
});
