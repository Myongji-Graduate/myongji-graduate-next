import React from 'react';
import StarRating from '../star-rating';
import { LectureData } from '../type';

interface LectureHeaderProps {
  course: Pick<LectureData, 'courseName' | 'averageRating' | 'courseId'>;
}

export default function LectureHeader({ course }: LectureHeaderProps) {
  const { courseName, averageRating, courseId } = course;

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 border-b pb-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-xl md:text-2xl">{courseName}</h3>
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-1">강의 코드: {courseId}</p>
      </div>
      <div className="flex items-center gap-2">
        <StarRating value={averageRating} size={20} showValue ariaLabel="평균 별점" />
      </div>
    </div>
  );
}
