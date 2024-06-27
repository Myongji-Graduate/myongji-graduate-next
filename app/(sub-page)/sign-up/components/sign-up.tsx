import SignUpForm from '@/app/ui/user/sign-up-form/sign-up-form';

interface SignUpProps {
  onNext?: () => void;
}

export default function SignUp({ onNext }: SignUpProps) {
  return <SignUpForm onSuccess={onNext} />;
}
