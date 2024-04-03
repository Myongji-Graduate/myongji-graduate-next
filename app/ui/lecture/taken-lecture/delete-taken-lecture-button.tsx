'use client';
import Button from '../../view/atom/button/button';
import { fetchDeleteLecture } from '@/app/business/lecture/taken-lecture.command';
import { swipeTakenLectureAtom, takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { useSetAtom } from 'jotai';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';
import { useToast } from '../../view/molecule/toast/use-toast';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
  swipeable?: boolean;
}
export default function DeleteTakenLectureButton({ lectureId, swipeable = false }: DeleteTakenLectureButtonProps) {
  const setTakenLectureState = useSetAtom(takenLectureAtom);
  const setSwipeTakenLectureState = useSetAtom(swipeTakenLectureAtom);
  const { toast } = useToast();

  const updateAllTakenLectureState = () => {
    setTakenLectureState((prev) => prev.filter((lecture) => lecture.id !== lectureId));
    setSwipeTakenLectureState((prev) => prev.filter((lecture) => lecture.id !== lectureId));
  };

  const updateTakenLectureState = () => {
    setTakenLectureState((prev) => prev.filter((lecture) => lecture.id !== lectureId));
  };

  const deleteLecture = async () => {
    const result = await fetchDeleteLecture(lectureId);
    if (!result.isSuccess) {
      toast({
        title: '과목 삭제에 실패했습니다',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {swipeable ? (
        <TrailingActions>
          <SwipeAction
            data-testid="swipe-taken-lecture-delete-button"
            destructive={true}
            onClick={() => {
              updateTakenLectureState();
              deleteLecture();
            }}
          >
            <div className="bg-gray-400 text-white flex justify-center items-center w-14">삭제</div>
          </SwipeAction>
        </TrailingActions>
      ) : (
        <div className="opacity-0 group-hover:opacity-100">
          <Button
            label="삭제"
            variant="text"
            size="default"
            data-testid="taken-lecture-delete-button"
            onClick={() => {
              updateAllTakenLectureState();
              deleteLecture();
            }}
          />
        </div>
      )}
    </>
  );
}
