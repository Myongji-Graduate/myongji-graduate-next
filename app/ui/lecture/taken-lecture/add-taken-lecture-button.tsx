'use client';
import { LectureInfo } from '@/app/type/lecture';
import Form from '../../view/molecule/form';
import { addTakenLecture } from '@/app/business/service/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';
import { useState } from 'react';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfo;
  isTaken: boolean;
}
export default function AddTakenLectureButton({ lectureItem, isTaken }: AddTakenLectureButtonProps) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(isTaken);

  const handleSuccessOfAdditionTakenLecture = () => {
    setDisabled(true);
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
