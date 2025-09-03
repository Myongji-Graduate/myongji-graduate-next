'use client';

import useDialog from '@/app/hooks/useDialog';
import LectureSearch from '@/app/ui/lecture/lecture-search';
import Button from '@/app/ui/view/atom/button/button';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import CompletionClassificationDropdown from './completion-classification-dropdown';
import NotCompletedLectureList from './not-completed-lecture-list';

function NotCompletedLectureContainer() {
  const { isOpen, open } = useDialog(DIALOG_KEY.LECTURE_SEARCH);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">미이수 과목 리스트</p>
      <div className="flex items-center justify-between">
        <div className="w-40">
          <CompletionClassificationDropdown />
        </div>
        <Button
          tabIndex={isOpen ? -1 : 0}
          data-cy="open-lecture-search-dialog-button"
          label="과목 추가"
          variant="secondary"
          data-testid="toggle-lecture-search"
          onClick={open}
          size="xs"
        />
      </div>
      <div>
        <NotCompletedLectureList />
      </div>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch />
      </Drawer>
    </div>
  );
}

export default NotCompletedLectureContainer;
