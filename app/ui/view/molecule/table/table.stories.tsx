import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../atom/button/button';
import { Table } from '.';
import DeleteTakenLectureButton from '@/app/ui/lecture/taken-lecture/delete-taken-lecture-button';
import Modal from '../modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

const meta = {
  title: 'ui/view/molecule/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'table에 할당할 data를 설정할 수 있습니다',
    },
    headerInfo: {
      description: 'table 의 header 정보를 설정할 수 있습니다',
    },
    renderActionButton: {
      description: 'table 내 존재할 action 버튼을 렌더링할 수 있습니다',
    },
    swipeable: {
      description: 'swipe 여부를 설정할 수 있습니다',
    },
    onSwipeAction: {
      description: 'swipe 이 가능하면 swipe 시 실행할 함수를 설정할 수 있습니다',
    },
    renderModal: {
      description: '테이블 행을 클릭했을 때 표시할 모달을 렌더링할 수 있습니다',
    },
    modalKey: {
      description: '모달의 고유 키를 설정할 수 있습니다',
    },
    onClick: {
      description: '테이블 행을 클릭했을 때 실행할 함수를 설정할 수 있습니다',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;

export const TakenLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];

    return (
      <main>
        <Table data={lectures} headerInfo={headerInfo} />
      </main>
    );
  },
};

export const ButtonLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];
    const actionButton = () => <Button variant="text" label="삭제" />;
    return (
      <main className="w-[600px]">
        <Table headerInfo={headerInfo} data={lectures} renderActionButton={actionButton} />
      </main>
    );
  },
};

export const SwipeableLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];
    const lectures = [
      {
        id: 140,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        credit: 3,
      },
      {
        id: 143,
        year: '2024',
        semester: '1학기',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
    ];
    const actionButton = () => <DeleteTakenLectureButton item={lectures[0]} onDelete={() => {}} />;
    return (
      <main>
        <Table
          headerInfo={headerInfo}
          data={lectures}
          renderActionButton={actionButton}
          swipeable={true}
          onSwipeAction={() => {}}
        />
      </main>
    );
  },
};

export const ModalLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['과목코드', '과목명', '평점', '수강인원', '이수구분'];
    const lectures = [
      {
        id: 140,
        lectureCode: 'HED01407',
        lectureName: '딥러닝',
        rating: '4.5',
        enrollmentCount: 33231,
        completionType: '전공필수',
      },
      {
        id: 143,
        lectureCode: 'HED01408',
        lectureName: '인공지능',
        rating: '5.0',
        enrollmentCount: 23312,
        completionType: '전공필수',
      },
      {
        id: 144,
        lectureCode: 'HED01409',
        lectureName: '머신러닝',
        rating: '4.2',
        enrollmentCount: 28901,
        completionType: '전공선택',
      },
    ];

    const renderLectureModal = (item: any, close: () => void) => (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <div className="max-lg:w-72 lg:p-6">
          <h3 className="font-semibold mb-4 text-lg">강의 상세 정보</h3>

          <div className="mt-6 flex justify-end">
            <Button variant="primary" label="닫기" onClick={close} size="sm" />
          </div>
        </div>
      </Modal>
    );

    return (
      <main className="w-[400px]">
        <Table headerInfo={headerInfo} data={lectures} renderModal={renderLectureModal} modalKey="LECTURE_INSIGHT" />
      </main>
    );
  },
};
