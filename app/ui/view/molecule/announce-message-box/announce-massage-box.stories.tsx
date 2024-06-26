import type { Meta, StoryObj } from '@storybook/react';
import AnnounceMessageBox from './announce-massage-box';

const meta = {
  title: 'ui/view/molecule/AnnounceMessageBox',
  component: AnnounceMessageBox,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '메세지를 담고 있는 container로 안내할 메시지가 있는 경우 사용됩니다',
  },
  argTypes: {
    message: {
      description: 'container 내부 메세지를 설정할 수 있습니다',
    },
  },
} satisfies Meta<typeof AnnounceMessageBox>;

export default meta;

interface AnnounceMessageBoxProp {
  message: string;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    message: '해당 파트의 졸업요건을 충족하셨습니다!',
  },
  render: (args: AnnounceMessageBoxProp) => <AnnounceMessageBox {...args} />,
};
