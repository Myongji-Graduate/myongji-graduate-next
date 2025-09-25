'use client';

import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import { usePostTimetable } from '@/app/store/querys/timetable/timetable';
import Button from '@/app/ui/view/atom/button/button';
import { toast } from '@/app/ui/view/molecule/toast/use-toast';

function SaveTimetableButton() {
  const { lecturesIds } = useTimetableLecture();

  const { mutate: uploadTimetable } = usePostTimetable({ lecturesIds });

  const handleSaveButton = () => {
    uploadTimetable(undefined, {
      onSuccess: (data) => {
        toast({ title: '시간표 저장에 성공했습니다.' });
      },
      onError: (error) => {
        toast({ title: '시간표 저장에 실패했습니다.', variant: 'destructive' });
        console.error(error);
      },
    });
  };

  return <Button label="저장" size="xs" variant="outlined" onClick={handleSaveButton} />;
}

export default SaveTimetableButton;
