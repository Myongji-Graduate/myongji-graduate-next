'use server';
import { API_PATH } from '../api-path';

export const registUserGrade = async (formData: FormData) => {
  const parsingText = await parsePDFtoText(formData);

  const res = await fetch(API_PATH.registUserGrade, {
    method: 'POST',
    body: JSON.stringify({ parsingText }),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch registUserGrade data.');
  }
  return await res.status;
};

export const parsePDFtoText = async (formData: FormData): Promise<string> => {
  const res = await fetch(API_PATH.parsePDFtoText, { method: 'POST', body: formData });
  if (!res.ok) {
    throw new Error('Failed to post parsePDF');
  }
  return await res.json();
};
