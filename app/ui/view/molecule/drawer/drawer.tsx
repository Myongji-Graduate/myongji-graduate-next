'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/app/utils/shadcn/utils';
import { ModalKey } from '@/app/utils/key/modal.key';
import useModal from '@/app/hooks/useModal';

interface DrawerProps extends React.PropsWithChildren {
  modalKey: ModalKey;
}

const Drawer = ({ children, modalKey }: DrawerProps) => {
  const { isOpen, toggle } = useModal(modalKey);

  return (
    <DrawerPrimitive.Root open={isOpen} onClose={toggle}>
      <DrawerPrimitive.Portal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <DrawerPrimitive.Content
          className={cn(
            'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950',
          )}
        >
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-slate-100 dark:bg-slate-800" />
          {children}
        </DrawerPrimitive.Content>
      </DrawerPrimitive.Portal>
    </DrawerPrimitive.Root>
  );
};

export default Drawer;
