import { DialogKey } from '../utils/key/dialog-key.util';
import { updateDialogAtom } from '../store/dialog';
import { useAtom } from 'jotai';

export default function useDialog(key: DialogKey, onClose?: () => void) {
  const [isOpenDialogList, setOpenDialogList] = useAtom(updateDialogAtom);

  const isOpen = isOpenDialogList[key];

  const open = () => {
    setOpenDialogList([key, true]);
  };

  const close = () => {
    const prevState = isOpenDialogList[key];
    setOpenDialogList([key, false]);

    if (prevState) onClose?.();
  };

  const toggle = () => {
    const prevState = isOpenDialogList[key];
    setOpenDialogList([key, !prevState]);

    if (prevState) onClose?.();
  };

  return { isOpen, open, close, toggle };
}
