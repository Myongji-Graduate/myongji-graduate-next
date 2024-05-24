import type { Meta, StoryObj } from '@storybook/react';
import Grid from '.';
import { GridRootProps } from './grid-root';

const meta = {
  title: 'ui/view/molecule/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    componentSubTitle: '요소들은 grid 로 나타낼때 사용하는 컴포넌트로 주로 Table 컴포넌트에서 사용됩니다',
    docs: {
      description: {
        component: `
- Grid component 하위에는 grid column component가 존재합니다 \n
- cols 속성을 통해 요소 비율을 control 할 수 있습니다 \n
- cols 속성엔 숫자가 할당될 수도 있지만, 특수한 경우를 고려해 'render-button' 값도 할당할 수 있습니다.
`,
      },
    },
  },
  argTypes: {
    cols: {
      description: 'cols 요소를 설정합니다',
      table: {
        type: { summary: 'GridCols' },
        defaultValue: { summary: 3 },
      },
      options: [3, 4, 5, 6, 'render-button'],
      control: {
        type: 'radio',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="border-2 border-black-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Grid.Column>영어</Grid.Column>
        <Grid.Column>2023-1학기</Grid.Column>
        <Grid.Column>1</Grid.Column>
      </>
    ),
    cols: 3,
  },
  render: ({ cols, children }: GridRootProps) => <Grid cols={cols}>{children}</Grid>,
};
export const RenderButton: Story = {
  args: {
    children: (
      <>
        <Grid.Column>영어</Grid.Column>
        <Grid.Column>1학기</Grid.Column>
        <Grid.Column>2023</Grid.Column>
        <Grid.Column>HED123</Grid.Column>
        <Grid.Column>2</Grid.Column>
        <button>버튼</button>
      </>
    ),
    cols: 'render-button',
  },
  render: ({ cols, children }: GridRootProps) => <Grid cols={cols}>{children}</Grid>,
};
