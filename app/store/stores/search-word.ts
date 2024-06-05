import { atom } from 'jotai';

type searchWord = {
  keyword: null | string;
  type: string;
};
export const searchWordAtom = atom<searchWord>({
  keyword: null,
  type: 'lectureName',
});
