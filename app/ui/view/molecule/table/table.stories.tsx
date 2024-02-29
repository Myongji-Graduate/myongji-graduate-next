import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../atom/button/button';
import { Table } from '.';

const meta = {
  title: 'ui/view/molecule/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;

export const TakenLectureTable: StoryObj = {
  render: () => {
    const headerInfo = ['과목코드', '과목명', '학점'];
    const lectures = [
      ['HEC01208', '데이터구조와알고리즘1', '3'],
      ['HEC01208', '데이터구조와알고리즘1', '3'],
      ['HEC01208', '데이터구조와알고리즘1', '3'],
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
      ['2022', '2학기', 'HEC01208', '데이터구조와알고리즘1', '3'],
      ['2022', '2학기', 'HEC01208', '데이터구조와알고리즘1', '3'],
      ['2022', '2학기', 'HEC01208', '데이터구조와알고리즘1', '3'],
    ];
    const actionButton = <Button variant="list" label="삭제" />;
    return (
      <main>
        <Table headerInfo={headerInfo} data={lectures} actionButton={actionButton} />
      </main>
    );
  },
};
