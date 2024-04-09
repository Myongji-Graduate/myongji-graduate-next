export const MODAL_KEY = {
  RESULT_CATEGORY: 'RESULT_CATEGORY',
  DIALOG_TEST: 'DIALOG_TEST',
} as const;

export type ModalKey = (typeof MODAL_KEY)[keyof typeof MODAL_KEY];
