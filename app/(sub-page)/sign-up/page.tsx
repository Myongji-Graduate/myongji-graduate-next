import SignUpForm from '@/app/ui/user/sign-up-form/sign-up-form';

export default async function Page() {
  return (
    <main>
      <div className="w-96">
        <SignUpForm />
      </div>
    </main>
  );
}
