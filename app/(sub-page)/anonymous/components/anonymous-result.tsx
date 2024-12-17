import { ResultCategoryViewer } from '@/app/ui/result/result-category/result-category';
import UserInfoContentViewer from '@/app/ui/user/user-info-card/user-info-content/user-info-content-viewer';
import { AnonymousResultType, parseCredit, parseUserInfo } from '@/app/utils/parser/anonymous';

interface AnonymousResultProps {
  data?: AnonymousResultType;
  onPrevious: () => void;
}

const AnonymousResult = ({ data, onPrevious }: AnonymousResultProps) => {
  if (!data) {
    onPrevious();
    return <></>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <UserInfoContentViewer data={parseUserInfo(data)} categories={parseCredit(data)} />
      </div>
      <ResultCategoryViewer categories={parseCredit(data)} className="top-[20rem] md:top-[27rem]" />
    </div>
  );
};

export default AnonymousResult;
