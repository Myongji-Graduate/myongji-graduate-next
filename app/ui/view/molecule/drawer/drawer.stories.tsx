import type { Meta, StoryObj } from '@storybook/react';
import Drawer from './drawer';
import { DIALOG_KEY, DialogKey } from '@/app/utils/key/dialog-key.util';

const meta = {
  title: 'ui/view/molecule/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
- drawer 키 값으로 drawer 노출을 control 할 수 있습니다 \n
- onClose 값으로 drawer가 닫혔을 때 실행할 함수입니다.\n
`,
      },
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;

interface DrawerProps extends React.PropsWithChildren {
  drawerKey: DialogKey;
}

export const Default: StoryObj<typeof meta> = {
  args: {
    children: <div className="text-xl h-40">Drawer</div>,
    drawerKey: DIALOG_KEY.DIALOG_TEST,
  },
  render: (args: DrawerProps) => <Drawer {...args} />,
};
