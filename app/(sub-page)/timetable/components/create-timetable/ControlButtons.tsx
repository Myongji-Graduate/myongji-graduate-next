'use client';

import useDialog from '@/app/hooks/useDialog';
import Button from '@/app/ui/view/atom/button/button';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';

function ControlButtons() {
  const { isOpen, open } = useDialog(DIALOG_KEY.TIMETABLE_LECTURE_SEARCH);

  return (
    <div className="flex justify-between">
      <Button label="과목 추가" size="xs" tabIndex={isOpen ? -1 : 0} onClick={open} />
      <div className="flex gap-2">
        <Button label="초기화" size="xs" variant="outlined" />
        <Button label="저장" size="xs" variant="outlined" />
        <Button label="삭제" size="xs" variant="outlined" />
      </div>
    </div>
  );
}

export default ControlButtons;
