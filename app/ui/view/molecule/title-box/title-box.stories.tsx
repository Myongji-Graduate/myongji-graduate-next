import type { Meta, StoryObj } from '@storybook/react';
import TitleBox from './title-box';
import AnnounceMessageBox from '../announce-message-box/announce-massage-box';

const meta = {
  title: 'ui/view/molecule/TitleBox',
  component: TitleBox,
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
