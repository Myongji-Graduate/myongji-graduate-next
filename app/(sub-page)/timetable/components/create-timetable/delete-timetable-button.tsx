'use client';

import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import { useDeleteTimetable } from '@/app/business/services/timetable/timetable.query';
import Button from '@/app/ui/view/atom/button/button';
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/app/ui/view/molecule/alert-dialog/alert-dialog';
import { toast } from '@/app/ui/view/molecule/toast/use-toast';
import { useState } from 'react';

function DeleteTimetableButton() {
  const { mutate: deleteTimetable } = useDeleteTimetable();
  const [open, setOpen] = useState(false);
  const { clearLectures } = useTimetableLecture();

  const handleConfirmButton = () => {
    deleteTimetable(undefined, {
      onSuccess: (data) => {
        clearLectures();
        toast({ title: '시간표를 삭제했습니다.' });
        setOpen(false);
      },
      onError: (error) => {
        toast({ title: '시간표 삭제에 실패했습니다.', variant: 'destructive' });
        console.error(error);
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button label="삭제" variant="outlined" size="xs" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>현재 저장된 시간표를 삭제할까요?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-6">
          <AlertDialogCancel>취소</AlertDialogCancel>
          <Button
            label="확인"
            className="text-primary font-bold bg-white hover:bg-white"
            onClick={handleConfirmButton}
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTimetableButton;
