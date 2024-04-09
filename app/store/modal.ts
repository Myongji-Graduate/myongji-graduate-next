import { atom } from 'jotai';
import { MODAL_KEY } from '../utils/key/modal.key';

const initialState = {
  [MODAL_KEY.RESULT_CATEGORY]: false,
};

const modalAtom = atom(initialState);

export const updateModalAtom = atom(
  (get) => get(modalAtom),
  (get, set, [key, value]) => {
    set(modalAtom, { ...get(modalAtom), [key]: value });
  },
);
