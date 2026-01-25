import Image from 'next/image';
import mainMyongjiLogo from '../../public/assets/main-myongji-logo.png';
import type { Metadata } from 'next';
import LoadingSpinner from '../ui/view/atom/loading-spinner/loading-spinner';

export const metadata: Metadata = {
  title: '서버 점검 중',
  description: '시스템 점검 중입니다. 잠시만 기다려 주세요.',
};

export default function MaintenancePage() {
  return (
    <div className={'bg-primary w-screen h-screen overflow-hidden relative flex flex-col items-center justify-center '}>
      <div className="relative h-full flex flex-col items-center justify-center gap-8 z-1 px-4">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-4xl font-bold sm:text-6xl md:text-7xl text-white">서버 점검 중</div>
          <div className="text-lg sm:text-xl text-gray-300 font-medium max-w-md">
            더 나은 서비스를 위해 시스템 점검을 진행하고 있습니다.
            <br />
            잠시만 기다려 주세요.
          </div>
          <div className="mt-4 text-sm sm:text-base text-gray-400 font-medium">
            점검 완료 후 다시 이용해 주시기 바랍니다.
          </div>
        </div>
        <div className="flex items-center justify-center mt-8">
          <LoadingSpinner className="animate-spin h-12 w-12 text-white" />
        </div>
      </div>
    </div>
  );
}
