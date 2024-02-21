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
        <Table>
          <Table.Header>
            <Grid cols={3}>
              {headerInfo.map((info) => (
                <Grid.Column key={info}>{info}</Grid.Column>
              ))}
            </Grid>
          </Table.Header>
          <List>
            {lectures.map((lecture, index) => (
              <List.Row key={index}>
                <Grid cols={3}>
                  {lecture.map((info) => (
                    <Grid.Column key={info}>{info}</Grid.Column>
                  ))}
                </Grid>
              </List.Row>
            ))}
          </List>
        </Table>
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
    return (
      <main>
        <Table>
          <Table.Header>
            <Grid cols={6}>
              {headerInfo.map((info) => (
                <Grid.Column key={info}>{info}</Grid.Column>
              ))}
            </Grid>
          </Table.Header>
          <List>
            {lectures.map((lecture, index) => (
              <List.Row key={index}>
                <Grid cols={6}>
                  {lecture.map((info) => (
                    <Grid.Column key={info}>{info}</Grid.Column>
                  ))}
                  <GridColumn>
                    <Button variant="delete" label="삭제" />
                  </GridColumn>
                </Grid>
              </List.Row>
            ))}
          </List>
        </Table>
      </main>
    );
  },
};
