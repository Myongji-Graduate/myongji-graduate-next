import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';

const meta = {
  title: 'ui/view/molecule/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;

interface DrawerProps extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl">Drawer</div>,
    open: true,
  },
  render: (args: DrawerProps) => <Drawer {...args} />,
};
