import { Link } from 'lucide-react';
import Button from '../view/atom/button/button';
import LabelContainer from '../view/atom/label-container/label-container';

export default function TakenLectureLabel() {
  return (
    <LabelContainer
      label="내 기이수 과목"
      rightElement={
        <div className="flex gap-2">
          <Button label="커스텀하기" variant="secondary" size="md" />
          <Link href="/file-upload">
            <Button label="업데이트" variant="secondary" size="md" />
          </Link>
        </div>
      }
    />
  );
}
