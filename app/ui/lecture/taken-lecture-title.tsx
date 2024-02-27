import { ReactNode } from 'react';

type TakenLectureTitle = {
  titleLabel: string;
  rightElement: ReactNode;
};

export default function TakenLectureTitle({ titleLabel, rightElement }: TakenLectureTitle) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="rounded-[100px] bg-light-blue-6 p-2.5 text-white text-lg font-bold">{titleLabel}</div>
      {rightElement}
    </div>
  );
}
