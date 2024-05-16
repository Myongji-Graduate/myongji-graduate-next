'use client';
import Button from '../../view/atom/button/button';
import { useRouter } from 'next/navigation';

export default function SignInLinkButton() {
  const router = useRouter();

  const handleToLoginButtonClick = () => {
    router.push('/sign-in');
  };
  return <Button onClick={handleToLoginButtonClick} size="sm" variant="text" label="로그인" />;
}
