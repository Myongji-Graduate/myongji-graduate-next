'use client';
import { ReactNode, useState } from 'react';
import { ListRow } from '../list/list-root';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

interface TableWithModalProps<T extends ListRow> {
  children: ReactNode;
  renderModal: (item: T, close: () => void) => ReactNode;
  modalKey?: string;
  onClick?: (item: T) => void;
}

export default function TableWithModal<T extends ListRow>({
  children,
  renderModal,
  modalKey = 'DIALOG_TEST',
  onClick,
}: TableWithModalProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const resolvedModalKey = modalKey ? DIALOG_KEY[modalKey as keyof typeof DIALOG_KEY] : DIALOG_KEY.DIALOG_TEST;
  const { open: openDialog, close: closeDialog } = useDialog(resolvedModalKey);

  const handleItemClick = (item: T) => {
    setSelectedItem(item);
    if (onClick) {
      onClick(item);
    }
    openDialog();
  };

  return (
    <>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          const row = target.closest('[data-item]');
          if (row) {
            const item = JSON.parse(row.getAttribute('data-item') || '{}');
            handleItemClick(item);
          }
        }}
      >
        {children}
      </div>
      {selectedItem && <div>{renderModal(selectedItem, closeDialog)}</div>}
    </>
  );
}
