import type { Meta, StoryObj } from '@storybook/react';
import Modal from './modal';
import { DIALOG_KEY, DialogKey } from '@/app/utils/key/dialog-key.util';

const meta = {
  title: 'ui/view/molecule/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    modalKey: {
      description: 'modal의 key를 할당할 수 있습니다',
    },
    children: {
      description: 'modal 내부 요소를 설정할 수 있습니다',
    },
    onClose: {
      description: 'modal이 close 되었을 때 callback으로 실행되는 함수를 설정할 수 있습니다',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

interface ModalProps extends React.PropsWithChildren {
  modalKey: DialogKey;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">테스트 모달</div>,
    modalKey: DIALOG_KEY.DIALOG_TEST,
  },
  render: (args: ModalProps) => <Modal {...args} />,
};
