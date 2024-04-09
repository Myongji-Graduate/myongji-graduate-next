import { atom } from 'jotai';
import { DIALOG_KEY } from '../utils/key/dialog.key';

const initialState = {
  [DIALOG_KEY.RESULT_CATEGORY]: false,
  [DIALOG_KEY.DIALOG_TEST]: true,
};

const dialogAtom = atom(initialState);

export const updateDialogAtom = atom(
  (get) => get(dialogAtom),
  (get, set, [key, value]) => {
    set(dialogAtom, { ...get(dialogAtom), [key]: value });
  },
);
