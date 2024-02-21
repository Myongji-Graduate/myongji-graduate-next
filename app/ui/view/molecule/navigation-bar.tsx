import Image from 'next/image';

export default function NavigationBar() {
  return (
    <div className="fixed p-4 border-b-[1px] w-full">
      <Image
        className="md:h-10 h-7 w-[110px] md:w-[150px]"
        width={150}
        height={100}
        src="/assets/logo.svg"
        alt="main-logo"
      />
    </div>
  );
}
