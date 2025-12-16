'use client';
import { ReactNode, useState } from 'react';
import { ListRow } from '../list/list-root';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY, DialogKey } from '@/app/utils/key/dialog-key.util';

interface TableWithModalProps<T extends ListRow> {
  children: ReactNode;
  renderModal: (item: T, close: () => void) => ReactNode;
  onClick?: (item: T) => void;
  modalKey?: DialogKey;
}

export default function TableWithModal<T extends ListRow>({
  children,
  renderModal,
  onClick,
  modalKey,
}: TableWithModalProps<T>) {
  const [selected, setSelected] = useState<T | null>(null);
  const { open, close } = useDialog(modalKey || DIALOG_KEY.LECTURE_INSIGHT);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const raw = (e.target as HTMLElement).closest('[data-item]')?.getAttribute('data-item');
    if (!raw) return;
    const item = JSON.parse(raw) as T;
    setSelected(item);
    onClick?.(item);
    open();
  };

  return (
    <>
      <div onClick={handleContainerClick}>{children}</div>
      {selected && renderModal(selected, close)}
    </>
  );
}
