import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';
import { MODAL_KEY, ModalKey } from '@/app/utils/key/modal.key';

const meta = {
  title: 'ui/view/molecule/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

interface DrawerProps extends React.PropsWithChildren {
  modalKey: ModalKey;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">Drawer</div>,
    modalKey: MODAL_KEY.DIALOG_TEST,
  },
  render: (args: DrawerProps) => <Drawer {...args} />,
};
