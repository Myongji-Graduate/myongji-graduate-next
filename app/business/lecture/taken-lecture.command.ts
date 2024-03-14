'use server';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../api-path';

export const registerUserGrade = async (prevState: FormState, formData: FormData) => {
  const parsingText = await parsePDFtoText(formData);

  const res = await fetch(API_PATH.registerUserGrade, {
    method: 'POST',
    body: JSON.stringify({ parsingText }),
  });

  if (!res.ok) {
    return {
      errors: {},
      message: 'fail upload grade',
    };
  }

  return {
    errors: {},
    message: '',
  };
};

export const parsePDFtoText = async (formData: FormData) => {
  const res = await fetch(API_PATH.parsePDFtoText, { method: 'POST', body: formData });
  if (!res.ok) {
    return {
      errors: {},
      message: 'fail parsing to text',
    };
  }
  return await res.json();
};
