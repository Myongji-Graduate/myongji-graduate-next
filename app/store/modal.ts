import { atom } from 'jotai';

const initialState = {
  RESULT_CATEGORY: false,
};

const modalAtom = atom(initialState);

export const updateModalAtom = atom(
  (get) => get(modalAtom),
  (get, set, [key, value]) => {
    set(modalAtom, { ...get(modalAtom), [key]: value });
  },
);
