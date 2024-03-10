import { create } from 'zustand';
import { LectureInfo } from '../type/lecture';

export const storeResetFns = new Set<() => void>();

export const resetAllStore = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

type LectureState = {
  takenLectures: LectureInfo[];
};

type LectureAction = {
  setTakenLectures: (takenLectures: LectureInfo[]) => void;
  deleteLecture: (id: number) => void;
};

type LectureStore = LectureState & {
  actions: LectureAction;
};

const initialLectureState: LectureState = {
  takenLectures: [],
};

export const useLectureStore = create<LectureStore>()((set) => {
  storeResetFns.add(() => set(initialLectureState));
  return {
    ...initialLectureState,
    actions: {
      setTakenLectures: (takenLectures) => {
        set({ takenLectures });
      },
      deleteLecture: (id) => {
        set((state) => ({
          takenLectures: state.takenLectures.filter((lecture) => lecture.id !== id),
        }));
      },
    },
  };
});
