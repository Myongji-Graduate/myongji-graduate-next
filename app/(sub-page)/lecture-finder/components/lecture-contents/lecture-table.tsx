'use client';

import React, { useMemo } from 'react';
import { Table } from '@/app/ui/view/molecule/table';
import { REQUIRED_LECTURE_TABLE_HEADER_INFO } from '@/app/ui/lecture/required-lecture/required-lecture-constant';
import LectureInsightModal from '../lecture-insight-modal/lecture-insight-modal';
import { LECTURE_FINDER_CATEGORY_KO } from '../type';
import TableListSkeleton from '@/app/ui/view/molecule/table/table-skeleton';
import type { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';

type Cell = string | number | boolean | null;

type LectureTableRow = {
  id: string;
  lectureName: string;
  credit: number;
  rating: string;
  enrollmentCount: number;
  category: string | null;
} & Record<string, Cell>;

const toNum = (v: unknown, fallback = 0): number => {
  const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : fallback;
};

function toRow(r: TimetableLectureRow): LectureTableRow {
  const key = r.categoryName as keyof typeof LECTURE_FINDER_CATEGORY_KO;
  return {
    id: String(r.id),
    lectureName: r.name ?? '강의명',
    credit: toNum(r.credit, 0),
    enrollmentCount: toNum(r.totalCount, 0),
    category: LECTURE_FINDER_CATEGORY_KO[key] ?? null,
    rating: r.averageRating != null ? String(r.averageRating) : '-',
  };
}

interface LectureTableProps {
  popularData?: TimetableLectureRow[];
  findData?: TimetableLectureRow[];
  lastContentRef?: React.Ref<HTMLDivElement>;
  isLoading?: boolean;
}

export default function LectureTable({ popularData, findData, lastContentRef, isLoading = false }: LectureTableProps) {
  const rawData = popularData ?? findData ?? [];

  const rows = useMemo(() => rawData.map(toRow), [rawData]);

  const renderLectureModal = (item: LectureTableRow) => <LectureInsightModal subject={item.lectureName} />;

  return (
    <div className="flex flex-col gap-4 py-3">
      {isLoading ? (
        <TableListSkeleton rows={8} cols={REQUIRED_LECTURE_TABLE_HEADER_INFO.length} />
      ) : (
        <Table
          headerInfo={REQUIRED_LECTURE_TABLE_HEADER_INFO}
          data={rows}
          nonRenderableKey={['id']}
          renderModal={renderLectureModal}
          modalKey="LECTURE_INSIGHT"
          lastContentRef={lastContentRef}
        />
      )}
    </div>
  );
}
