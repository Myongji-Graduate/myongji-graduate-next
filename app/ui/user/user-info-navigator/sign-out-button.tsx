'use client';
import { signOut } from '@/app/business/service/user/user.command';
import Button from '../../view/atom/button/button';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut();
  };

  return <Button onClick={handleSignOut} size="sm" variant="secondary" label="로그아웃" />;
}
