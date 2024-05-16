'use client';
import Button from '../../view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import useDialog from '@/app/hooks/useDialog';

export default function UserDeleteButton() {
  const { toggle } = useDialog(DIALOG_KEY.USER_DELETE);

  const handleModalToggle = () => {
    toggle();
  };

  return <Button onClick={handleModalToggle} size="sm" variant="text" label="회원탈퇴하기" />;
}
