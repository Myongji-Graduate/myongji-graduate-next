import { DialogKey } from '../utils/key/dialog.key';
import { updateDialogAtom } from '../store/dialog';
import { useAtom } from 'jotai';

export default function useDialog(key: DialogKey) {
  const [isOpenDialogList, setOpenDialogList] = useAtom(updateDialogAtom);

  const isOpen = isOpenDialogList[key];

  const close = () => {
    setOpenDialogList([key, false]);
  };

  const toggle = () => {
    const prevState = isOpenDialogList[key];
    setOpenDialogList([key, !prevState]);
  };

  return { isOpen, close, toggle };
}
