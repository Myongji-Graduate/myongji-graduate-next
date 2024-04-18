'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/app/utils/shadcn/utils';
import { DialogKey } from '@/app/utils/key/dialog.key';
import useDialog from '@/app/hooks/useDialog';

interface DrawerProps extends React.PropsWithChildren {
  drawerKey: DialogKey;
}

const Drawer = ({ children, drawerKey }: DrawerProps) => {
  const { isOpen, close } = useDialog(drawerKey);

  return (
    <DrawerPrimitive.Root open={isOpen} onClose={close}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DrawerPrimitive.Content
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-[90vh] flex-col rounded-t-[10px] border border-slate-200 bg-white',
          )}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};

export default Drawer;
