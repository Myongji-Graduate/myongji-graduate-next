'use server';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../../api-path';
import { BadRequestError } from '@/app/utils/http/http-error';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { instance } from '@/app/utils/api/instance';

export const registerUserGrade = async (prevState: FormState, formData: FormData) => {
  const parsingText = await parsePDFtoText(formData);

  const res = await fetch(API_PATH.registerUserGrade, {
    method: 'POST',
    body: JSON.stringify({ parsingText }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });

  if (!res.ok) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: 'fail upload grade',
    };
  }
  redirect('/result');
};

export const parsePDFtoText = async (formData: FormData) => {
  const res = await fetch(API_PATH.parsePDFtoText, { method: 'POST', body: formData });
  if (!res.ok) {
    return {
      errors: {},
      message: 'fail parsing to text',
    };
  }
  return await res.text();
};

export const deleteTakenLecture = async (lectureId: number) => {
  try {
    await instance.delete(`${API_PATH.takenLectures}/${lectureId}`, {
      responseType: 'text',
    });

    return {
      isSuccess: true,
    };
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
      };
    } else {
      throw error;
    }
  }
};

export const addTakenLecture = async (lectureId: string) => {
  try {
    await instance.post(
      API_PATH.takenLectures,
      { lectureId },
      {
        responseType: 'text',
      },
    );
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '과목 추가에 성공했습니다',
    };
  } catch (error) {
    if (error instanceof BadRequestError) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: '과목 추가에 실패했습니다',
      };
    } else {
      throw error;
    }
  }
};
