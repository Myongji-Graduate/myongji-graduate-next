export const DIALOG_KEY = {
  RESULT_CATEGORY: 'RESULT_CATEGORY',
  DIALOG_TEST: 'DIALOG_TEST',
  LECTURE_SEARCH: 'LECTURE_SEARCH',
} as const;

export type DialogKey = (typeof DIALOG_KEY)[keyof typeof DIALOG_KEY];