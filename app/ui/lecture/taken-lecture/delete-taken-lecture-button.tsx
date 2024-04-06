'use client';
import Button from '../../view/atom/button/button';
import { fetchDeleteLecture } from '@/app/business/lecture/taken-lecture.command';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { useAtom } from 'jotai';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';
import { useToast } from '../../view/molecule/toast/use-toast';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
  swipeable?: boolean;
  deleteOptimisticLecture?: (action: unknown) => void;
}
export default function DeleteTakenLectureButton({
  lectureId,
  swipeable = false,
  deleteOptimisticLecture,
}: DeleteTakenLectureButtonProps) {
  const { toast } = useToast();
  const [takenLectures, setTakenLectures] = useAtom(takenLectureAtom);

  const handleDelete = async () => {
    if (deleteOptimisticLecture) deleteOptimisticLecture(lectureId);
    deleteLecture();
  };

  const deleteLecture = async () => {
    const result = await fetchDeleteLecture(lectureId);
    if (!result.isSuccess) {
      return toast({
        title: '과목 삭제에 실패했습니다',
        variant: 'destructive',
      });
    }
    setTakenLectures(takenLectures?.filter((lecture) => lecture.id !== lectureId));
  };

  return (
    <>
      {swipeable ? (
        <TrailingActions>
          <SwipeAction
            data-testid="swipe-taken-lecture-delete-button"
            destructive={true}
            onClick={() => {
              //
            }}
          >
            <div className="bg-gray-400 text-white flex justify-center items-center w-14">삭제</div>
          </SwipeAction>
        </TrailingActions>
      ) : (
        <form action={handleDelete}>
          <div className="opacity-0 group-hover:opacity-100">
            <Button label="삭제" variant="text" size="default" />
          </div>
        </form>
      )}
    </>
  );
}
