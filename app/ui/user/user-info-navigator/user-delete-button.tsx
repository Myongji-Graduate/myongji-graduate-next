'use client';
import Button from '../../view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import useDialog from '@/app/hooks/useDialog';
import UserDeleteModal from './user-delete-modal';

export default function UserDeleteButton() {
  const { open: userDeleteDialogOpen } = useDialog(DIALOG_KEY.USER_DELETE);
  const { close: sideDialogClose } = useDialog(DIALOG_KEY.SIDE_NAVIGATION);

  const handleModalToggle = () => {
    sideDialogClose();
    userDeleteDialogOpen();
  };

  return (
    <>
      <Button onClick={handleModalToggle} size="sm" variant="text" label="회원탈퇴하기" />
      <UserDeleteModal />
    </>
  );
}
