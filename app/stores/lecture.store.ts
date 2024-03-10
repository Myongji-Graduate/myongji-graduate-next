import { create } from 'zustand';
import { LectureInfo, SearchedLectureInfo } from '../type/lecture';

export const storeResetFns = new Set<() => void>();

export const resetAllStore = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

type LectureState = {
  isCustomizing: boolean;
  takenLectures: LectureInfo[];
  searchedLectures: SearchedLectureInfo[];
};

type LectureAction = {
  setTakenLectures: (takenLectures: LectureInfo[]) => void;
  deleteTakenLecture: (id: number) => void;
  addTakenLecutre: (takenLecture: LectureInfo) => void;
  changeCustomizingState: () => void;
};

type LectureStore = LectureState & {
  actions: LectureAction;
};

const initialLectureState: LectureState = {
  isCustomizing: false,
  takenLectures: [],
  searchedLectures: [
    { id: 3, lectureCode: 'HCB03490', name: '경영정보사례연구', credit: 3 },
    { id: 4, lectureCode: 'HCB03490', name: '게임을통한경영의이해', credit: 3 },
  ],
};

export const useLectureStore = create<LectureStore>()((set) => {
  storeResetFns.add(() => set(initialLectureState));
  return {
    ...initialLectureState,
    actions: {
      setTakenLectures: (takenLectures) => {
        set({ takenLectures });
      },
      deleteTakenLecture: (id) => {
        set((state) => ({
          takenLectures: state.takenLectures.filter((lecture) => lecture.id !== id),
        }));
      },
      addTakenLecutre: (takenLecture) => {
        set((state) => ({
          takenLectures: [...state.takenLectures, takenLecture],
        }));
      },
      changeCustomizingState: () => {
        set((state) => ({
          isCustomizing: !state.isCustomizing,
        }));
      },
    },
  };
});
