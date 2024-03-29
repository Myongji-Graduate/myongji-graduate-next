'use client';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';
import Button from '../../view/atom/button/button';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
  swipeable?: boolean;
}
export default function DeleteTakenLectureButton({ lectureId, swipeable = false }: DeleteTakenLectureButtonProps) {
  const deleteLecture = () => {
    // 삭제 api 연결 예정
  };
  return (
    <>
      {swipeable ? (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => {
              // 삭제 api
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
            onClick={deleteLecture}
          />
        </div>
      )}
    </>
  );
}
