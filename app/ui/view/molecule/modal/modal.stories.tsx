import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';
import { MODAL_KEY, ModalKey } from '@/app/utils/key/modal.key';

const meta = {
  title: 'ui/view/molecule/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

interface ModalProps extends React.PropsWithChildren {
  modalKey: ModalKey;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">테스트 모달</div>,
    modalKey: MODAL_KEY.DIALOG_TEST,
  },
  render: (args: ModalProps) => <Modal {...args} />,
};
