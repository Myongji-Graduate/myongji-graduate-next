'use client';

import LectureFilter from './lecture-filter';
import LectureTable from './lecture-table';
import { useLectureFinderForm } from '@/app/business/hooks/use-lecture-finder-form.hook.ts';
import { useLectureFinderData } from '@/app/business/hooks/use-lecture-finder-data.hook';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';

function LectureContents() {
  const { toast } = useToast();

  const {
    pending,
    committed,
    didSearch,
    handleMajorChange,
    handleYearChange,
    handleCategoryChange,
    handleSortChange,
    handleSearch,
  } = useLectureFinderForm({
    onInvalid: (msg) => toast({ title: msg, variant: 'destructive' }),
  });

  const { isAll, usingPopular, popularData, loadingPopular, errorPopular, findData, loadingFind, errorFind } =
    useLectureFinderData({ committed, didSearch });

  return (
    <div className="flex h-50 flex-col gap-4 px-3 py-5">
      <LectureFilter
        value={pending}
        onMajorChange={handleMajorChange}
        onYearChange={handleYearChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
      />

      {usingPopular ? (
        <LectureTable isAll={isAll} popularData={popularData} isLoading={loadingPopular} error={errorPopular} />
      ) : (
        <LectureTable isAll={isAll} findData={findData} isLoading={loadingFind} error={errorFind} />
      )}
    </div>
  );
}

export default LectureContents;
