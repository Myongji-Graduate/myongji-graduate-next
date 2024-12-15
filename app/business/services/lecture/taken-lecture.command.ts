'use server';
import { FormState } from '@/app/ui/view/molecule/form/form-root';
import { API_PATH } from '../../api-path';
import { BadRequestError, HttpError } from '@/app/utils/http/http-error';
import { redirect } from 'next/navigation';
import { instance } from '@/app/utils/api/instance';
import { revalidateTag } from 'next/cache';
import { TAG } from '@/app/utils/http/tag';
import { ERROR_CODE } from '@/app/utils/api/constant';
import fetchAX from 'fetch-ax';

export const registerUserGrade = async (prevState: FormState, formData: FormData) => {
  try {
    const parsingText = await parsePDFtoText(formData);
    await instance.post(API_PATH.registerUserGrade, { parsingText });
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '',
    };
  } catch (error) {
    if (error instanceof HttpError) {
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: error.getErrorMessage() ?? '',
      };
    }
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: ERROR_CODE.INTERNAL_SEVER_ERROR,
    };
  }
};

export const parsePDFtoText = async (formData: FormData) => {
  const response = await fetchAX.post(API_PATH.parsePDFtoText, formData, {
    responseType: 'text',
  });
  return response.data;
};

export const deleteTakenLecture = async (lectureId: number) => {
  try {
    await instance.delete(`${API_PATH.takenLectures}/${lectureId}`, {
      responseType: 'text',
    });
    revalidateTag(TAG.GET_TAKEN_LECTURES);
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
    revalidateTag(TAG.GET_TAKEN_LECTURES);
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
