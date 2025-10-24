'use client';

import { useCallback, useState } from 'react';
import type { PendingFilters, CategoryKey, Year, Major } from '@/app/(sub-page)/lecture-finder/components/type';
import { validateLectureFilters } from '@/app/(sub-page)/lecture-finder/components/lecture-finder.validation';

const DEFAULT_PENDING: PendingFilters = {
  major: '' as '' | Major,
  year: '' as '' | Year,
  category: 'all',
  sort: null,
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
    const next = v == null ? 'all' : String(v);
    setPending((p) => ({ ...p, category: next as CategoryKey }));
  }, []);

  const handleSearch = useCallback(() => {
    const { isValid, errors } = validateLectureFilters(pending);
    if (!isValid) {
      errors.forEach((e) => onInvalid?.(e));
      return;
    }
    setCommitted(pending);
    setDidSearch(true);
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
