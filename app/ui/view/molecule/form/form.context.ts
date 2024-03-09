import { createContext } from 'react';
import type { FormState } from './form-root';

interface FormContext extends FormState {
  formId: string;
}

export const FormContext = createContext<FormContext>({
  formId: '',
  message: null,
  errors: {},
});
