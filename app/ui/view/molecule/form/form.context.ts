import { createContext } from 'react';
import type { State } from './form-root';

type FormContext = State & { formId: string };

export const FormContext = createContext<FormContext>({
  formId: '',
  message: null,
  errors: {},
});
