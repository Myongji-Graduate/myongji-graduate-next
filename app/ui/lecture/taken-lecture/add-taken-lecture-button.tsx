'use client';
import { LectureInfoResponse } from '@/app/store/querys/result';
import Form from '../../view/molecule/form';
import { addTakenLecture } from '@/app/business/services/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfoResponse;
  isTaken: boolean;
}
export default function AddTakenLectureButton({ lectureItem, isTaken }: AddTakenLectureButtonProps) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(isTaken);
  const router = useRouter();

  const handleSuccessOfAdditionTakenLecture = () => {
    setDisabled(true);
    router.refresh();
    return toast({
      title: '과목 추가에 성공했습니다',
    });
  };

  return (
    <Form
      id={`과목추가-${lectureItem.id}`}
      action={() => {
        return addTakenLecture(lectureItem.id);
      }}
      failMessageControl="toast"
      onSuccess={handleSuccessOfAdditionTakenLecture}
    >
      <Form.SubmitButton
        label="추가"
        position="center"
        variant="list"
        disabled={disabled}
        size="default"
        data-testid="add-taken-lecture-button"
        data-cy={`add-lecture-button-${lectureItem.name}`}
      />
    </Form>
  );
}
