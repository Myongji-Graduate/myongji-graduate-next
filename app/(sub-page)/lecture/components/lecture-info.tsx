import React from 'react';
import StarRating from './star-rating';

interface Review {
  author: string;
  content: string;
  rating: number;
}

interface Lecture {
  professor: string;
  assignment: string;
  grading: string;
  attendance: string;
  exam: string;
  rating: number | null;
  reviews: Review[];
}

interface LectureInfoProps {
  lecture: Lecture | undefined;
  isMobile?: boolean;
}

export default function LectureInfo({ lecture, isMobile = false }: LectureInfoProps) {
  if (!lecture) {
    return <div className="text-sm text-gray-500">교수를 선택하면 상세 정보가 표시됩니다.</div>;
  }

  const headerClassName = isMobile ? 'flex flex-col gap-2' : 'flex items-center justify-between gap-2';

  const professorNameClassName = isMobile ? 'font-semibold text-sm whitespace-nowrap' : 'font-semibold text-base';

  const titleClassName = isMobile ? 'font-semibold text-sm mb-2' : 'font-semibold text-base mb-2';

  const exampleTextClassName = isMobile ? 'text-[11px] text-gray-500' : 'text-xs text-gray-500';

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
            <dd className="font-medium">{lecture.assignment}</dd>
          </div>
          <div>
            <dt className="text-gray-500">조모임</dt>
            <dd className="font-medium">{lecture.grading}</dd>
          </div>
          <div>
            <dt className="text-gray-500">출결</dt>
            <dd className="font-medium">{lecture.attendance}</dd>
          </div>
          <div>
            <dt className="text-gray-500">시험</dt>
            <dd className="font-medium">{lecture.exam}</dd>
          </div>
        </dl>
      </div>

      <div className={exampleTextClassName}>
        ※ 과제(없음/보통/많음), 조모임(없음/보통/많음), 출결(너그러움/보통/깐깐함), 시험(없음/한 번/두 번)
      </div>

      <div>
        <h4 className={titleClassName}>수강 후기</h4>
        {lecture.reviews.length === 0 ? (
          <div className="text-sm text-gray-500 border rounded-xl p-3">아직 등록된 후기가 없습니다.</div>
        ) : (
          <ul className="space-y-2">
            {lecture.reviews.map((review, i) => (
              <li key={i} className={`rounded-xl px-3 py-2 border`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-gray-600">작성자: {review.author}</p>
                  <StarRating value={review.rating} size={16} />
                </div>
                <p className="text-sm mt-1">{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
