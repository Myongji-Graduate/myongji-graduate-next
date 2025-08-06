'use client';
import { signOut } from '@/app/business/services/user/user.command';
import Button from '../../view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import useDialog from '@/app/hooks/useDialog';

export default function SignOutButton() {
  const { close } = useDialog(DIALOG_KEY.SIDE_NAVIGATION);

  const handleSignOut = async () => {
    await signOut();
    close();
  };

  return <Button onClick={handleSignOut} size="sm" variant="secondary" label="로그아웃" />;
}
