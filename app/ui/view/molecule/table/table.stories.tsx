import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../atom/button/button';
import { Table } from '.';
import DeleteTakenLectureButton from '@/app/ui/lecture/taken-lecture/delete-taken-lecture-button';

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
