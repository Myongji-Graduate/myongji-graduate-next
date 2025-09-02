import Button from '@/app/ui/view/atom/button/button';
import Image from 'next/image';
import Link from 'next/link';

function InitUser() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Image src="/assets/embarrassing-maru.png" alt="당황스러워하는 마루 이미지" width={400} height={400} />
      <p>아직 성적표가 등록되지 않았어요. 성적표를 먼저 업로드해주세요!</p>
      <Link href="/grade-upload">
        <Button label={'성적표 업로드하러 가기'} size="md" className="mt-8" />
      </Link>
    </div>
  );
}

export default InitUser;
