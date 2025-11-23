import React, { useEffect } from 'react';
import StarRating from '../star-rating';
import { DetailedLecture } from '@/app/business/services/lecture-finder/lecture-finder.types';
import { useFetchInfiniteLectureInfo } from '@/app/business/services/lecture-finder/lecture-info-query';
import { useInView } from 'react-intersection-observer';
import Skeleton from '@/app/utils/skeleton';

interface LectureInfoProps {
  lecture: DetailedLecture;
  professor: string;
  isMobile?: boolean;
}

export default function LectureInfo({ lecture, professor, isMobile = false }: LectureInfoProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useFetchInfiniteLectureInfo(
    lecture?.subject ?? '',
    professor,
    1,
    5,
  );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const headerClassName = isMobile ? 'flex flex-col gap-2' : 'flex items-center justify-between gap-2';
  const professorNameClassName = isMobile
    ? 'font-semibold text-sm whitespace-nowrap'
    : 'font-semibold text-base whitespace-nowrap';
  const exampleTextClassName = isMobile ? 'text-[11px] text-gray-500' : 'text-xs text-gray-500';

  const allReviews = data?.pages.flatMap((page) => page.items || []) ?? [];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-3">
        <div className={headerClassName}>
          <div className={professorNameClassName}>{lecture.professor} 교수님</div>
          <StarRating value={lecture.rating} size={18} showValue />
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-x-3 md:gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500">과제</dt>
            <dd className="font-medium">{lecture.assignment ?? '-'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">조모임</dt>
            <dd className="font-medium">{lecture.teamwork ?? '-'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">출결</dt>
            <dd className="font-medium">{lecture.attendance.length > 0 ? lecture.attendance.join(', ') : '-'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">시험</dt>
            <dd className="font-medium">{lecture.exam.length > 0 ? lecture.exam.join(', ') : '-'}</dd>
          </div>
        </dl>
      </div>

      <div className={exampleTextClassName}>
        ※ 과제(없음/보통/많음), 조모임(없음/보통/많음), 출결(전자출결/직접호명), 시험(한 번/두 번)
      </div>
      <div>
        {isLoading ? (
          <Skeleton className="w-full h-12" />
        ) : allReviews.length === 0 ? (
          <div className="text-sm text-gray-500 border rounded-xl p-3">아직 등록된 후기가 없습니다.</div>
        ) : (
          <ul className="space-y-3">
            {allReviews.map((review, i) => (
              <li key={i} className="rounded-xl px-3 py-2 border">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-600">{review.semester}</p>
                  <StarRating value={review.rating} size={16} />
                </div>
                <p className="text-sm py-2 pt-3">{review.content}</p>

                {i === allReviews.length - 1 && hasNextPage && <div ref={ref} className="h-6"></div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
