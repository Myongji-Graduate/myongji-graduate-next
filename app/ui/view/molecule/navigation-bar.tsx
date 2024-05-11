import Image from 'next/image';
import logo from '../../../../public/assets/logo.svg';

export default function NavigationBar() {
  return (
    <div className="absolute p-4 border-b-[1px] w-full">
      {/* <Image className="md:h-10 h-7 w-[110px] md:w-[150px]" width={150} height={100} src={logo} alt="main-logo" /> */}
    </div>
  );
}
