import React from 'react';
import { Table } from '@/app/ui/view/molecule/table';
import { RESULT_CATEGORY_KO } from '@/app/utils/key/result-category.key';
import { REQUIRED_LECTURE_TABLE_HEADER_INFO } from '@/app/ui/lecture/required-lecture/required-lecture-constant';
import LectureInsightModal from '../lecture-insight-modal/lecture-insight-modal';
interface LectureTableProps {
  isAll: boolean;
}

interface LectureTableData {
  id: number;
  lectureName: string;
  rating: string;
  enrollmentCount: number;
  completionType: string;
  [key: string]: string | number;
}

function LectureTable({ isAll }: LectureTableProps) {
  // 카테고리별 강의 데이터

  const lecturesByCategory = {
    [RESULT_CATEGORY_KO.PRIMARY_BASIC_ACADEMICAL_CULTURE]: [
      {
        id: 140,
        lectureName: '딥러닝',
        rating: '4.5',
        enrollmentCount: 33231,
        completionType: '전공필수',
      },
      {
        id: 143,
        lectureName: '인공지능',
        rating: '5',
        enrollmentCount: 23312,
        completionType: '전공필수',
      },
    ],
    [RESULT_CATEGORY_KO.PRIMARY_MANDATORY_MAJOR]: [
      {
        id: 144,
        lectureName: '머신러닝',
        rating: '4.2',
        enrollmentCount: 28901,
        completionType: '전공선택',
      },
      {
        id: 145,
        lectureName: '데이터베이스',
        rating: '4.8',
        enrollmentCount: 25678,
        completionType: '전공필수',
      },
    ],
    [RESULT_CATEGORY_KO.CORE_CULTURE]: [
      {
        id: 146,
        lectureName: '컴퓨터구조',
        rating: '4.3',
        enrollmentCount: 19876,
        completionType: '전공필수',
      },
      {
        id: 147,
        lectureName: '알고리즘',
        rating: '4.7',
        enrollmentCount: 22345,
        completionType: '전공선택',
      },
    ],
  };

  // 카테고리로 분류되지 않은 일반 강의 데이터
  const lectures: LectureTableData[] = [
    {
      id: 140,
      lectureName: '딥러닝',
      rating: '4.5',
      enrollmentCount: 33231,
      completionType: '전공필수',
    },
    {
      id: 143,
      lectureName: '인공지능',
      rating: '5',
      enrollmentCount: 23312,
      completionType: '전공필수',
    },
  ];

  const categories = [
    RESULT_CATEGORY_KO.PRIMARY_BASIC_ACADEMICAL_CULTURE,
    RESULT_CATEGORY_KO.PRIMARY_MANDATORY_MAJOR,
    RESULT_CATEGORY_KO.CORE_CULTURE,
  ];

  const renderLectureModal = () => <LectureInsightModal />;

  return (
    <div className="flex flex-col gap-4 py-3">
      {!isAll ? (
        categories.map((category, index) => (
          <div key={index} className="flex flex-col gap-2">
            <p className="font-semibold px-2">{category}</p>
            <Table
              headerInfo={REQUIRED_LECTURE_TABLE_HEADER_INFO}
              data={lecturesByCategory[category]}
              nonRenderableKey={['id']}
              renderModal={renderLectureModal}
              modalKey="LECTURE_INSIGHT"
            />
          </div>
        ))
      ) : (
        <Table
          headerInfo={REQUIRED_LECTURE_TABLE_HEADER_INFO}
          data={lectures}
          nonRenderableKey={['id']}
          renderModal={renderLectureModal}
          modalKey="LECTURE_INSIGHT"
        />
      )}
    </div>
  );
}

export default LectureTable;
