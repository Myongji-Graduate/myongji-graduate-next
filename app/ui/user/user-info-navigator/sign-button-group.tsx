import SignOutButton from './sign-out-button';
import UserDeleteButton from './user-delete-button';

export default function SignButtonGroup() {
  return (
    <div className="flex flex-col items-center mt-9 space-y-2">
      <SignOutButton />
      <UserDeleteButton />
    </div>
  );
}
