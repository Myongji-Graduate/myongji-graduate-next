'use client';

import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
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
import { useState } from 'react';

function ClearTimetableTrigger() {
  const { clearLectures } = useTimetableLecture();
  const [open, setOpen] = useState(false);

  const handleConfirmButton = () => {
    clearLectures();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button label="초기화" variant="outlined" size="xs" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>현재 시간표를 초기화할까요?</AlertDialogTitle>
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

export default ClearTimetableTrigger;
