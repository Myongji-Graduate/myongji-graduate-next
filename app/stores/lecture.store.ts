import { create } from 'zustand';
import { LectureInfo } from '../type/lecture';

export const storeResetFns = new Set<() => void>();

export const resetAllStore = () => {
  storeResetFns.forEach((resetFn) => {
    resetFn();
  });
};

type TakenLectureState = {
  takenLectures: LectureInfo[];
};

type TakenLectureAction = {
  setTakenLectures: (takenLectures: LectureInfo[]) => void;
};

type TakenLectureStore = TakenLectureState & {
  actions: TakenLectureAction;
};

const initialTakenLectureState: TakenLectureState = {
  takenLectures: [],
};

export const useTakenLectureStore = create<TakenLectureStore>()((set) => {
  storeResetFns.add(() => set(initialTakenLectureState));
  return {
    ...initialTakenLectureState,
    actions: {
      setTakenLectures: (takenLectures) => {
        set({ takenLectures });
      },
    },
  };
});
