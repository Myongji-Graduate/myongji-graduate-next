'use client';

import { Portal, Overlay, Content, Root } from '@radix-ui/react-dialog';

import { cn } from '../../../../utils/shadcn/utils';
import useDialog from '@/app/hooks/useDialog';
import { DialogKey } from '@/app/utils/key/dialog-key.util';

const fadeAnimation =
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
const noneSlideAnimation =
  'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]';

interface ModalProp extends React.PropsWithChildren {
  modalKey: DialogKey;
  onClose?: () => void;
}

const Modal = ({ modalKey, children, onClose }: ModalProp) => {
  const { isOpen, toggle } = useDialog(modalKey, onClose);

  return (
    <Root open={isOpen} onOpenChange={toggle}>
      <Portal>
        <Overlay className={cn('fixed inset-0 zIndex-3 bg-black/50', fadeAnimation)} />
        <Content
          className={cn(
            'outline-none fixed left-[50%] top-[50%] zIndex-3 max-w-[90%] min-w-[30%] overflow-y-auto translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-lg duration-200 rounded-lg max-h-[70vh] lg:max-h-[90vh]',
            noneSlideAnimation,
            fadeAnimation,
          )}
        >
          {children}
        </Content>
      </Portal>
    </Root>
  );
};

export default Modal;
