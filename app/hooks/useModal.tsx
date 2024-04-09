import { ModalKey } from '../utils/key/modal.key';
import { updateModalAtom } from '../store/modal';
import { useAtom } from 'jotai';

export default function useModal(key: ModalKey) {
  const [isOpenModalList, setOpenModalList] = useAtom(updateModalAtom);

  const isOpen = isOpenModalList[key];

  const close = () => {
    setOpenModalList([key, false]);
  };

  const toggle = () => {
    const prevState = isOpenModalList[key];
    setOpenModalList([key, !prevState]);
  };

  return { isOpen, close, toggle };
}
