import React from 'react';
import StarRating from './star-rating';
import SourceBadge from './source-badge';

interface LectureHeaderProps {
  courseName: string;
  courseId: number;
  averageRating: number;
  source: {
    name: string;
    url: string;
    note: string;
    lastCrawledAt?: string;
  };
}

export default function LectureHeader({ courseName, courseId, averageRating, source }: LectureHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 border-b pb-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-xl md:text-2xl">{courseName}</h3>
          <SourceBadge name={source.name} url={source.url} note={source.note} />
        </div>
        <p className="text-xs md:text-sm text-gray-500 mt-1">
          강의 코드: {courseId}
          {source.lastCrawledAt ? <span className="ml-2 text-gray-400">(업데이트: {source.lastCrawledAt})</span> : null}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <StarRating value={averageRating} size={20} showValue ariaLabel="평균 별점" />
      </div>
    </div>
  );
}
