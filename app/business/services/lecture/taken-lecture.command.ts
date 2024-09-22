'use server';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../../api-path';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { BadRequestError } from '@/app/utils/http/http-error';
import { revalidateTag } from 'next/cache';
import { TAG } from '@/app/utils/http/tag';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getToken } from '../auth';

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
    const response = await fetch(`${API_PATH.takenLectures}/${lectureId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    if (response.ok) {
      revalidateTag(TAG.GET_TAKEN_LECTURES);
      return {
        isSuccess: true,
      };
    } else {
      return {
        isSuccess: false,
      };
    }
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

export const addTakenLecture = async (lectureId: number) => {
  const token = await getToken();
  const response = await fetch(API_PATH.takenLectures, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ lectureId }),
  });
  // delete taken lecture과 비슷한 이유로 코드 수정
  if (response.ok) {
    revalidateTag(TAG.GET_TAKEN_LECTURES);
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '과목 추가에 성공했습니다',
    };
  } else {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: '과목 추가에 실패했습니다',
    };
  }
};
