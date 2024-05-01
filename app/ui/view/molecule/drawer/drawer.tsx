'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/app/utils/shadcn/utils';
import { DialogKey } from '@/app/utils/key/dialog-key.util';
import useDialog from '@/app/hooks/useDialog';

interface DrawerProps extends React.PropsWithChildren {
  drawerKey: DialogKey;
  onClose?: () => void;
  className?: string;
}

const Drawer = ({ children, drawerKey, onClose, className }: DrawerProps) => {
  const { isOpen, close } = useDialog(drawerKey, onClose);

  return (
    <DrawerPrimitive.Root open={isOpen} onClose={close}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DrawerPrimitive.Content
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[10px] border border-slate-200 bg-white',
            className,
          )}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};

export default Drawer;
