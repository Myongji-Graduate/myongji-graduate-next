import { auth } from '@/app/business/user/user.query';
import SignOutButton from './sign-out-button';
import UserDeleteButton from './user-delete-button';
import SignInLinkButton from './sign-in-link-button';
import Button from '../../view/atom/button/button';
import Link from 'next/link';

export default async function SignButtonGroup() {
  const userInfo = await auth();
  return (
    <div className="flex flex-col items-center mt-9 space-y-2">
      {userInfo ? (
        <>
          <SignOutButton />
          <UserDeleteButton />
        </>
      ) : (
        <SignInLinkButton />
      )}
    </div>
  );
}
