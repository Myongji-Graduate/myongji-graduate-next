import Button from '@/app/ui/view/atom/button/button';
import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

function AddLectureTrigger() {
  const { isOpen, open } = useDialog(DIALOG_KEY.TIMETABLE_LECTURE_SEARCH);

  return <Button label="과목 추가" size="xs" tabIndex={isOpen ? -1 : 0} onClick={open} className="h-[42px]" />;
}

export default AddLectureTrigger;
