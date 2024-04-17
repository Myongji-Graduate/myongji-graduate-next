import { LectureInfo } from '@/app/type/lecture';
import Form from '../../view/molecule/form';
import { fetchAddTakenLecture } from '@/app/business/lecture/taken-lecture.command';
import { useToast } from '../../view/molecule/toast/use-toast';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfo;
  isTakenLecture: boolean;
}
export default function AddTakenLectureButton({ lectureItem, isTakenLecture }: AddTakenLectureButtonProps) {
  const { toast } = useToast();

  const announceSuccessOfAddTakenLecture = () => {
    return toast({
      title: '과목 추가에 성공했습니다',
    });
  };

  return (
    <Form
      id={`과목추가-${lectureItem.id}`}
      action={() => {
        return fetchAddTakenLecture(lectureItem.id);
      }}
      messageControl="toast"
      onSuccess={announceSuccessOfAddTakenLecture}
    >
      <Form.SubmitButton
        label="추가"
        position="center"
        variant="list"
        disabledInfo={{ value: isTakenLecture, control: true }}
        size="default"
        data-testid="add-taken-lecture-button"
      />
    </Form>
  );
}
