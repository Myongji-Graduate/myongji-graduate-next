'use client';

import { useRef } from 'react';
import LectureFilter from './lecture-filter';
import LectureTable from './lecture-table';
import { useLectureFinderForm } from '@/app/business/hooks/use-lecture-finder-form.hook';
import { useLectureFinderData } from '@/app/business/hooks/use-lecture-finder-data.hook';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';

export default function LectureContents() {
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
  } = useLectureFinderForm({ onInvalid: (m) => toast({ title: m, variant: 'destructive' }) });

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    isAll,
    usingPopular,
    popularRows,
    initRows,
    loadingPopular,
    errorPopular,
    loadingInit,
    errorInit,
    sentinelRef,
    isFetchingNext,
  } = useLectureFinderData({ committed, didSearch, limit: 10, rootRef: scrollRef, rootMargin: '400px 0px' });

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

      <div ref={scrollRef} className="max-h-[70vh] overflow-auto">
        {usingPopular ? (
          <LectureTable isAll={isAll} popularData={popularRows} isLoading={loadingPopular} error={errorPopular} />
        ) : (
          <LectureTable isAll={isAll} findData={initRows} isLoading={loadingInit} error={errorInit} />
        )}

        <div ref={sentinelRef} className="h-10" />
        {isFetchingNext && (
          <div className="rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center">
            <LoadingSpinner
              className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
              style={{ transition: `width 150ms` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
