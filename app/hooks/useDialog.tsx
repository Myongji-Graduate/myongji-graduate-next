import { DialogKey } from '../utils/key/dialog-key.util';
import { updateDialogAtom } from '../store/dialog';
import { useAtom } from 'jotai';

export default function useDialog(key: DialogKey, closeDialog?: () => void) {
  const [isOpenDialogList, setOpenDialogList] = useAtom(updateDialogAtom);

  const isOpen = isOpenDialogList[key];

  const close = () => {
    setOpenDialogList([key, false]);
    closeDialog?.();
  };

  const toggle = () => {
    const prevState = isOpenDialogList[key];
    setOpenDialogList([key, !prevState]);

    if (prevState) closeDialog?.();
  };

  return { isOpen, close, toggle };
}
