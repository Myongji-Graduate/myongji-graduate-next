'use client';
import Button from '../../view/atom/button/button';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../view/molecule/alert-dialog/alert-dialog';

interface DeleteTakenLectureButtonProps {
  lectureId: number;
  handleDelete: (lectureId: number) => void;
}
export default function DeleteTakenLectureButton({ lectureId, handleDelete }: DeleteTakenLectureButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="opacity-0 group-hover:opacity-100">
          <Button label="삭제" variant="text" size="default" type="submit" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>과목을 삭제하시겠습니까?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-6">
          <AlertDialogCancel className="font-bold">취소</AlertDialogCancel>
          <form
            action={() => {
              handleDelete(lectureId);
            }}
          >
            <Button
              label="확인"
              className="text-primary  font-bold"
              onClick={() => {
                setOpen(false);
              }}
            />
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
