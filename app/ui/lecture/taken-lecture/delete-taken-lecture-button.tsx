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
  onDelete: (lectureId: number) => void;
}
export default function DeleteTakenLectureButton({ lectureId, onDelete }: DeleteTakenLectureButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="opacity-0 group-hover:opacity-100">
          <Button
            label="삭제"
            variant="text"
            size="default"
            data-cy={`taken-lecture-delete-model-trigger-${lectureId}`}
            data-testid="taken-lecture-delete-button"
          />
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
              onDelete(lectureId);
            }}
          >
            <Button
              label="확인"
              className="text-primary font-bold bg-white hover:bg-white"
              data-cy="confirm-button"
              data-testid="confirm-button"
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
