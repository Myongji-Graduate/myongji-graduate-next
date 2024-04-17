import type { Meta, StoryObj } from '@storybook/react';
import AnnounceMessageBox from './announce-massage-box';

const meta = {
  title: 'ui/view/molecule/AnnounceMessageBox',
  component: AnnounceMessageBox,
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
