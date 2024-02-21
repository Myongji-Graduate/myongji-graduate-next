import type { Meta, StoryObj } from '@storybook/react';
import Table from '.';
import Grid from '../grid';
import List from '../list';
import { GridColumn } from '../grid/grid-column';
import Button from '../../atom/button/button';

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
        <Table data={lectures} headerinfo={headerInfo} />
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
    const actionButton = <Button variant="delete" label="삭제" />;
    return (
      <main>
        <Table headerinfo={headerInfo} data={lectures} actionButton={actionButton} />
      </main>
    );
  },
};
