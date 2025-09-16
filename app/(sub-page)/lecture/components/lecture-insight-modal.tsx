import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import LectureHeader from './lecture-header';
import ProfessorSelector from './professor-selector';
import LectureInfo from './lecture-info';

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

interface LectureData {
  courseName: string;
  averageRating: number;
  courseId: number;
  source: {
    name: string;
    url: string;
    note: string;
    lastCrawledAt?: string;
  };
  lectures: Lecture[];
}

export default function LectureInsightModal() {
  const [focusProfessor, setProfessor] = React.useState('김상균');

  const data: LectureData = {
    courseName: '기초프로그래밍',
    averageRating: 4.6,
    courseId: 21232,
    source: {
      name: '에브리타임',
      url: 'https://everytime.kr/',
      note: '크롤링 기반',
      lastCrawledAt: '2025-09-16 23:00',
    },
    lectures: [
      {
        professor: '김상균',
        assignment: '없음',
        grading: '너그러움',
        attendance: '전자출결',
        exam: '없음',
        rating: 5,
        reviews: [
          { author: '익명 1', content: '너무 좋은 강의다', rating: 5 },
          { author: '익명 2', content: '망헀다', rating: 1 },
        ],
      },
      {
        professor: '최성운',
        assignment: '없음',
        grading: '너그러움',
        attendance: '전자출결',
        exam: '없음',
        rating: null,
        reviews: [],
      },
      {
        professor: '오민식',
        assignment: '없음',
        grading: '너그러움',
        attendance: '전자출결',
        exam: '없음',
        rating: null,
        reviews: [],
      },
    ],
  };

  const current = data.lectures.find((l) => l.professor === focusProfessor);

  return (
    <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
      <div className="w-full max-w-[720px] px-4 md:px-0">
        <LectureHeader
          courseName={data.courseName}
          courseId={data.courseId}
          averageRating={data.averageRating}
          source={data.source}
        />

        <Responsive maxWidth={767}>
          <div className="mt-4 w-60 space-y-4">
            <ProfessorSelector
              professors={data.lectures}
              selectedProfessor={focusProfessor}
              onSelectProfessor={setProfessor}
              isMobile={true}
            />
            <div>
              <div className="text-base font-semibold mb-2">강의 정보</div>
              <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
                <LectureInfo lecture={current} isMobile={true} />
              </div>
            </div>
          </div>
        </Responsive>

        <Responsive minWidth={768}>
          <div className="mt-4 grid grid-cols-[210px_1fr] gap-6">
            <ProfessorSelector
              professors={data.lectures}
              selectedProfessor={focusProfessor}
              onSelectProfessor={setProfessor}
              isMobile={false}
            />
            <div>
              <div className="text-lg font-semibold mb-2">강의 정보</div>
              <div className="max-h-60 overflow-y-auto scrollbar-hide">
                <LectureInfo lecture={current} isMobile={false} />
              </div>
            </div>
          </div>
        </Responsive>
      </div>
    </Modal>
  );
}
