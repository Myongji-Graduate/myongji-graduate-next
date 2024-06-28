import SignUpForm from '@/app/ui/user/sign-up-form/sign-up-form';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import MaruImage from '@/public/assets/mju-maru.jpg';
import Image from 'next/image';

interface SignUpProps {
  onNext?: () => void;
}

export default function SignUp({ onNext }: SignUpProps) {
  return (
    <div className="flex p-9">
      <div className="w-2/4">
        <Image className="object-cover h-full" src={MaruImage} alt="마루" />
      </div>
      <div className="w-2/4 pl-7 ">
        <div className="pb-12">
          <TitleBox title={'회원가입'} />
        </div>
        <SignUpForm onSuccess={onNext} />
      </div>
    </div>
  );
}
