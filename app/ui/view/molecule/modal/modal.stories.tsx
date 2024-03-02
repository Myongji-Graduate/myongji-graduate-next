import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';

const meta = {
  title: 'ui/view/molecule/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onOpenChange: () => void;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">테스트 모달</div>,
    open: true,
  },
  render: (args: ModalProps) => <Modal {...args} />,
};
