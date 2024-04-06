'use server';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../api-path';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError } from '@/app/utils/http/http-error';
import { revalidateTag } from 'next/cache';
import { TAG } from '@/app/utils/http/tag';

export const registerUserGrade = async (prevState: FormState, formData: FormData) => {
  const parsingText = await parsePDFtoText(formData);

  const res = await fetch(API_PATH.registerUserGrade, {
    method: 'POST',
    body: JSON.stringify({ parsingText }),
  });

  if (!res.ok) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: 'fail upload grade',
    };
  }

  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
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

export const fetchDeleteLecture = async (lectureId: number) => {
  try {
    const response = await fetch(API_PATH.takenLectures, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lectureId }),
    });
    const result = await response.json();
    httpErrorHandler(response, result);
    revalidateTag(TAG.GET_TAKEN_LECTURES);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
      };
    } else {
      throw error;
    }
  }
  return {
    isSuccess: true,
  };
};
