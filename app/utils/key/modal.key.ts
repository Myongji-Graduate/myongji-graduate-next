export const MODAL_KEY = {
  RESULT_CATEGORY: 'RESULT_CATEGORY',
} as const;

export type ModalKey = (typeof MODAL_KEY)[keyof typeof MODAL_KEY];
