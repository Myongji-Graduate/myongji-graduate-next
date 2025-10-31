import useDialog from '@/app/hooks/useDialog';
import Button from '@/app/ui/view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

function RecommendLectureTrigger() {
  const { open: recommendLectureDialogOpen } = useDialog(DIALOG_KEY.RECOMMEND_LECTURE);

  const handleModalToggle = () => {
    recommendLectureDialogOpen();
  };

  return (
    <div className="flex justify-end">
      <Button
        label="시간표 과목 추천받기"
        variant="outlined"
        onClick={handleModalToggle}
        size="xs"
        className="h-[42px] w-[225px]"
      />
    </div>
  );
}

export default RecommendLectureTrigger;
