import { atom } from 'jotai';
import { DIALOG_KEY } from '../../utils/key/dialog-key.util';

const initialState = {
  [DIALOG_KEY.RESULT_CATEGORY]: false,
  [DIALOG_KEY.DIALOG_TEST]: true,
  [DIALOG_KEY.LECTURE_SEARCH]: false,
  [DIALOG_KEY.USER_DELETE]: false,
  [DIALOG_KEY.SIDE_NAVIGATION]: false,
  [DIALOG_KEY.UPDATE_INSTRUCTION]: false,
  [DIALOG_KEY.TIMETABLE_LECTURE_SEARCH]: false,
};

const dialogAtom = atom(initialState);

export const isDialogOpenAtom = atom(false);

export const updateDialogAtom = atom(
  (get) => get(dialogAtom),
  (get, set, [key, value]) => {
    set(dialogAtom, { ...get(dialogAtom), [key]: value });
  },
);
