import type { Meta, StoryObj } from '@storybook/react';
import List from '.';
import Grid from '../grid';
import { ListRootProps } from './list-root';

const meta = {
  title: 'ui/view/molecule/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    componentSubTitle: '요소들은 list 로 나타낼때 사용하는 컴포넌트로 주로 Table 컴포넌트에서 사용됩니다',
    docs: {
      description: {
        component: `
- List component 하위에는 list row component가 존재합니다 \n
- data는 맵핑을 해 렌더링 할 데이터입니다\n
- 이때 렌더링은 render 함수를 실행시켜 list 내부 요소를 렌더링하도록 실행합니다.\n
- isScrollList는 지정된 높이가 넘어가면 scroll을 노출시킬지 여부입니다. lecture search component에서 사용됩니다\n
- emptyDataRender는 data가 존재하지 않을 때 호출할 함수입니다.
`,
      },
    },
  },
} satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    render: (item: any, index: number) => {
      return (
        <List.Row key={index}>
          <Grid cols={5}>
            {Object.keys(item).map((key, index) => {
              if (key === 'id') return null;
              return <Grid.Column key={index}>{item[key]}</Grid.Column>;
            })}
          </Grid>
        </List.Row>
      );
    },
    data: [
      {
        id: 140,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
      {
        id: 139,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },
    ],
  },
  render: ({ data, render, ...args }: ListRootProps<any>) => <List data={data} render={render} />,
};

export const ScrollList: Story = {
  args: {
    render: (item: any, index: number) => {
      return (
        <List.Row key={index}>
          <Grid cols={5}>
            {Object.keys(item).map((key, index) => {
              if (key === 'id') return null;
              return <Grid.Column key={index}>{item[key]}</Grid.Column>;
            })}
          </Grid>
        </List.Row>
      );
    },
    data: [
      {
        id: 140,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01407',
        lectureName: '인공지능',
        credit: 3,
      },
      {
        id: 139,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },
      {
        id: 138,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },
      {
        id: 137,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },
      {
        id: 136,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },

      {
        id: 16,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: 'HED01311',
        lectureName: '자기주도학습',
        credit: 2,
      },
    ],
    isScrollList: true,
  },

  render: ({ data, render, isScrollList }: ListRootProps<any>) => (
    <List isScrollList={isScrollList} data={data} render={render} />
  ),
};
