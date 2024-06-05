import { takenLectureAtom } from '@/app/store/stores/custom-taken-lecture';
import { useOptimistic } from 'react';
import { useAtom } from 'jotai';
import { TakenLectrueInfo } from '@/app/type/lecture';

export function useTakenLecture() {
  const [takenLectures, setTakenLectures] = useAtom(takenLectureAtom);

  const [optimisticLecture, deleteOptimisticLecture] = useOptimistic(
    takenLectures,
    (currentTakenLectures, lectureId) => {
      return currentTakenLectures.filter((lecture) => lecture.id !== lectureId);
    },
  );

  const deleteLecture = (lectureId: number) => {
    setTakenLectures(takenLectures?.filter((lecture) => lecture.id !== lectureId));
  };

  const initializeTakenLectures = (data: TakenLectrueInfo[]) => {
    setTakenLectures(data);
  };

  return {
    takenLectures,
    optimisticLecture,
    deleteOptimisticLecture,
    deleteLecture,
    initializeTakenLectures,
  };
}
