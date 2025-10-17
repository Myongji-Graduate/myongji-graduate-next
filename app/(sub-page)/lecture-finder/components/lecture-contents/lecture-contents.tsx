'use client';

import { useState, useCallback, useMemo } from 'react';
import LectureFilter from './lecture-filter';
import LectureTable from './lecture-table';
import { useFindLectures, usePopularLectures } from '@/app/business/services/lecture-finder/lecture-finder.query';
import type { PendingFilters, CategoryKey, Year } from '../type';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';

const DEFAULT_PENDING: PendingFilters = {
  major: '',
  year: '',
  category: 'all' as CategoryKey,
  sort: null,
};

function LectureContents() {
  const [pending, setPending] = useState<PendingFilters>(DEFAULT_PENDING);
  const [committed, setCommitted] = useState<PendingFilters>(DEFAULT_PENDING);
  const [didSearch, setDidSearch] = useState(false);
  const { toast } = useToast();

  const onSearch = useCallback(() => {
    const lacksMajor = !pending.major;
    const lacksYear = !pending.year;

    if (lacksMajor) {
      toast({ title: '전공을 선택해주세요', variant: 'destructive' });
    }
    if (lacksYear) {
      toast({ title: '입학년도를 선택해주세요', variant: 'destructive' });
    }
    if (lacksMajor || lacksYear) return;

    setCommitted(pending);
    setDidSearch(true);
  }, [pending, toast]);

  const entryYear = useMemo<Year | undefined>(() => (committed.year ? committed.year : undefined), [committed.year]);

  const hasMajor = committed.major !== '';
  const hasYear = committed.year !== '';
  const hasCategory = committed.category !== 'all';

  const isInitial = !didSearch && !hasMajor && !hasYear && committed.category === 'all' && committed.sort === null;

  const popularEnabled = didSearch && hasMajor && hasYear && hasCategory;
  const findEnabled = isInitial;

  const limit = 10;

  const popularQuery = useMemo(
    () =>
      popularEnabled
        ? {
            major: committed.major,
            entryYear: entryYear as string | number,
            category: committed.category as Exclude<CategoryKey, 'all'>,
            limit,
          }
        : null,
    [popularEnabled, committed.major, committed.category, entryYear, limit],
  );

  const {
    data: popularData,
    isLoading: loadingPopular,
    error: errorPopular,
  } = usePopularLectures(popularQuery, popularEnabled);

  const { data: findData, isLoading: loadingFind, error: errorFind } = useFindLectures({ limit }, findEnabled);

  const isAll = committed.category === 'all';

  return (
    <div className="flex h-50 flex-col gap-4 px-3 py-5">
      <LectureFilter value={pending} onChange={setPending} onSearch={onSearch} />

      {didSearch ? (
        <LectureTable
          isAll={isAll}
          popularData={popularData}
          isLoading={loadingPopular}
          error={errorPopular as Error | null}
        />
      ) : (
        <LectureTable isAll={isAll} findData={findData} isLoading={loadingFind} error={errorFind as Error | null} />
      )}
    </div>
  );
}

export default LectureContents;
