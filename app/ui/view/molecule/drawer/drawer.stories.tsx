import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';
import { DIALOG_KEY, DialogKey } from '@/app/utils/key/dialog-key.util';

const meta = {
  title: 'ui/view/molecule/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

interface DrawerProps extends React.PropsWithChildren {
  drawerKey: DialogKey;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">Drawer</div>,
    drawerKey: DIALOG_KEY.DIALOG_TEST,
  },
  render: (args: DrawerProps) => <Drawer {...args} />,
};
