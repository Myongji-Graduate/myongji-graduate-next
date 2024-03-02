'use client';

import { Portal, Overlay, Content, Root } from '@radix-ui/react-dialog';

import { cn } from '../../../../utils/shadcn/utils';

interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onOpenChange: () => void;
  className?: string;
}

const fadeAnimation =
  'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
const noneSlideAnimation =
  'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]';

const Modal = ({ className, children, open, onOpenChange }: ModalProps) => (
  <Root open={open} onOpenChange={onOpenChange}>
    <Portal>
      <Overlay className={cn('fixed inset-0 zIndex-3 bg-black/50', fadeAnimation)} />
      <Content
        className={cn(
          'outline-none fixed left-[50%] top-[50%] zIndex-3 max-w-[90%] min-w-[30%] overflow-y-auto translate-x-[-50%] translate-y-[-50%] bg-white p-6 shadow-lg duration-200 rounded-lg max-h-[70vh] lg:max-h-[90vh]',
          noneSlideAnimation,
          fadeAnimation,
          className,
        )}
      >
        {children}
      </Content>
    </Portal>
  </Root>
);

export default Modal;
