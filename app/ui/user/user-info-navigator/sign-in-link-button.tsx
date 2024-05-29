'use client';
import useDialog from '@/app/hooks/useDialog';
import Button from '../../view/atom/button/button';
import { useRouter } from 'next/navigation';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

export default function SignInLinkButton() {
  const { close } = useDialog(DIALOG_KEY.SIDE_NAVIGATION);
  const router = useRouter();

  const handleToLoginButtonClick = () => {
    close();
    router.push('/sign-in');
  };
  return <Button onClick={handleToLoginButtonClick} size="sm" variant="text" label="로그인" />;
}
