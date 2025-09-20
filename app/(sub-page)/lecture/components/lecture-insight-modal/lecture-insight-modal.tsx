import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import LectureHeader from './lecture-header';
import LectureInsightModalMobile from './lecture-insight-modal-mobile';
import LectureInsightModalDesktop from './lecture-insight-modal-desktop';
import { LectureData } from '../type';

export default function LectureInsightModal() {
  const [focusProfessor, setProfessor] = React.useState('김상균');

  const data: LectureData = {
    courseName: '기초프로그래밍',
    averageRating: 4.6,
    courseId: 21232,
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

  const render = () => (
    <div className="w-full max-w-[720px] px-4 md:px-0">
      <LectureHeader course={data} />

      <Responsive maxWidth={767}>
        <LectureInsightModalMobile
          data={data}
          focusProfessor={focusProfessor}
          onSelectProfessor={setProfessor}
          current={current}
        />
      </Responsive>

      <Responsive minWidth={768}>
        <LectureInsightModalDesktop
          data={data}
          focusProfessor={focusProfessor}
          onSelectProfessor={setProfessor}
          current={current}
        />
      </Responsive>
    </div>
  );

  return <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>{render()}</Modal>;
}
