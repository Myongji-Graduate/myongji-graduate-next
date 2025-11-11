'use client';

import { useCallback, useState } from 'react';
import type { PendingFilters, CategoryKey, Year, Major } from '@/app/(sub-page)/lecture-finder/components/type';
import { validateLectureFilters } from '@/app/(sub-page)/lecture-finder/components/lecture-finder.validation';
import { z } from 'zod';
import { toast } from '@/app/ui/view/molecule/toast/use-toast';

const DEFAULT_PENDING: PendingFilters = {
  major: '' as '' | Major,
  year: '' as '' | Year,
  category: 'ALL' as CategoryKey,
};

type UseLectureFinderFormParams = {
  onInvalid?: (msg: string) => void;
};

export function useLectureFinderForm({ onInvalid }: UseLectureFinderFormParams = {}) {
  const [pending, setPending] = useState<PendingFilters>(DEFAULT_PENDING);
  const [committed, setCommitted] = useState<PendingFilters>(DEFAULT_PENDING);
  const [didSearch, setDidSearch] = useState(false);

  const handleMajorChange = useCallback((v: unknown) => {
    const next = v == null ? '' : String(v);
    setPending((p) => ({ ...p, major: next as Major | '' }));
  }, []);

  const handleYearChange = useCallback((v: unknown) => {
    const next = v == null ? '' : String(v);
    setPending((p) => ({ ...p, year: next as Year | '' }));
  }, []);

  const handleCategoryChange = useCallback((v: unknown) => {
    const next = v == null ? 'ALL' : String(v);
    setPending((p) => ({ ...p, category: next as CategoryKey }));
  }, []);

  const handleSearch = useCallback(() => {
    try {
      const validData = validateLectureFilters(pending) as PendingFilters;
      setCommitted(validData);
      setDidSearch(true);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors?.[0]?.message || '잘못된 입력입니다';
        toast({ title: message, variant: 'destructive' });
        if (onInvalid) onInvalid(message);
      } else {
        console.error(error);
        toast({ title: '검색 중 오류가 발생했습니다.', variant: 'destructive' });
      }
      return false;
    }
  }, [pending, onInvalid]);

  return {
    pending,
    committed,
    didSearch,
    handleMajorChange,
    handleYearChange,
    handleCategoryChange,
    handleSearch,
  };
}
