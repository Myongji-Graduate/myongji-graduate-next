import { LectureInfo } from '@/app/type/lecture';
import Form from '../../view/molecule/form';
import { fetchAddTakenLecture } from '@/app/business/lecture/taken-lecture.command';

interface AddTakenLectureButtonProps {
  lectureItem: LectureInfo;
  isTakenLecture: boolean;
}
export default function AddTakenLectureButton({ lectureItem, isTakenLecture }: AddTakenLectureButtonProps) {
  return (
    <Form
      id={`과목추가-${lectureItem.id}`}
      action={() => {
        return fetchAddTakenLecture(lectureItem.id);
      }}
    >
      <Form.SubmitButton
        label="추가"
        position="center"
        variant="list"
        disabled={{ value: isTakenLecture, control: true }}
        size="default"
      />
    </Form>
  );
}
