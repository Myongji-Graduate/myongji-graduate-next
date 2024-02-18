import type { StoryObj } from '@storybook/react';
import { List } from '.';

const meta = {
  title: 'ui/view/molecule/list',
  component: List,
  parameters: {
    invalid: '해당 과목이 유효한지 나타내는 값으로 list row component text의 color를 변경할 수 있습니다',
  },
};

export default meta;

export const DefaultList: StoryObj<typeof List> = {
  render: () => {
    const headerColumns = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];
    const rowColumns = ['2022', '2학기', 'HEC01302', '분산프로그래밍', '3'];
    return (
      <div>
        <List>
          <List.Header columns={headerColumns} />
          <List.Row columns={rowColumns} />
        </List>
      </div>
    );
  },
};

export const InvalidList: StoryObj<typeof List> = {
  render: () => {
    const rowColumns = ['HEC01302', '분산프로그래밍', '3'];
    return (
      <div>
        <List>
          <List.Row columns={rowColumns} invalid={true} />
        </List>
      </div>
    );
  },
};
