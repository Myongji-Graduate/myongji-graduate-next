'use server';
import { API_PATH } from '../api-path';

export const uploadFile = async (formData: FormData) => {
  //수강정보에 대한 정보를 변경시킨다는 차원으로 네이밍이 바뀌는게 적절할듯
  //수강정보로 파일 및 폴더명 변경
  const parsedresult = await parsePDF(formData);

  const res = await fetch(API_PATH.uploadFile, { method: 'POST', body: JSON.stringify({ parsingText: parsedresult }) });
  if (!res.ok) {
    throw new Error('Failed to fetch uploadFile data.');
  }
  return await res.status;
};

export const parsePDF = async (formData: FormData): Promise<string> => {
  const res = await fetch(API_PATH.parsePDF, { method: 'POST', body: formData });
  if (!res.ok) {
    throw new Error('Failed to post parsePDF');
  }
  return await res.json();
};
