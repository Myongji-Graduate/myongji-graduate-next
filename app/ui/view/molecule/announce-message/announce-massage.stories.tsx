import type { Meta, StoryObj } from '@storybook/react';
import AnnounceMessage from './announce-massage';

const meta = {
  title: 'ui/view/molecule/AnnounceMessage',
  component: AnnounceMessage,
} satisfies Meta<typeof AnnounceMessage>;

export default meta;

interface AnnounceMessageProp {
  message: string;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    message: '해당 파트의 졸업요건을 충족하셨습니다!',
  },
  render: (args: AnnounceMessageProp) => <AnnounceMessage {...args} />,
};
