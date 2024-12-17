'use client';
import { ResultCategoryViewer } from '@/app/ui/result/result-category/result-category';
import UserInfoContentViewer from '@/app/ui/user/user-info-card/user-info-content/user-info-content-viewer';
import { AnonymousResultType, parseCredit, parseUserInfo } from '@/app/utils/parser/anonymous';
import { useAnonymousContext } from '../result/provider';
import { useRouter } from 'next/navigation';

const AnonymousResult = () => {
  const { result } = useAnonymousContext();
  const router = useRouter();

  if (!result) {
    router.back();
    return <></>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <UserInfoContentViewer data={parseUserInfo(result)} categories={parseCredit(result)} />
      </div>
      <ResultCategoryViewer categories={parseCredit(result)} className="top-[20rem] md:top-[27rem]" />
    </div>
  );
};

export default AnonymousResult;
