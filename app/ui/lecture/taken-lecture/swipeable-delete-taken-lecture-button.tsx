import React from 'react';
import { DeleteTakenLectureButtonProps } from './delete-taken-lecture-button';
import { SwipeAction, TrailingActions } from 'react-swipeable-list';

export default function SwipeableDeleteTakenLectureButton({ lectureId }: DeleteTakenLectureButtonProps) {
  const deleteLecture = () => {
    //삭제 api
  };
  return (
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
  );
}
