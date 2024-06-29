import type { Meta, StoryObj } from '@storybook/react';
import TitleBox from './title-box';
import AnnounceMessageBox from '../announce-message-box/announce-massage-box';

const meta = {
  title: 'ui/view/molecule/TitleBox',
  component: TitleBox,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '요소는 페이지의 대표 title을 표기하는 경우에 사용됩니다.',
  },
  argTypes: {
    title: {
      description: 'title의 내용을 설정할 수 있습니다.',
    },
  },
} as Meta<typeof TitleBox>;

export default meta;
type Story = StoryObj<typeof meta>;

interface TitleBoxProps extends React.PropsWithChildren {
  title: string;
}

export const Default: Story = {
  args: {
    children: <AnnounceMessageBox message="해당 파트의 졸업요건을 충족하셨습니다!" />,
    title: '졸업 요건 안내',
  },
  render: (args: TitleBoxProps) => <TitleBox {...args} />,
};
