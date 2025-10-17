'use client';

import React, { useMemo } from 'react';
import { Table } from '@/app/ui/view/molecule/table';
import { REQUIRED_LECTURE_TABLE_HEADER_INFO } from '@/app/ui/lecture/required-lecture/required-lecture-constant';
import LectureInsightModal from '../lecture-insight-modal/lecture-insight-modal';
import { LECTURE_FINDER_CATEGORY_KO } from '../type';
import type { TimetableLectureRow } from '@/app/type/timetable/types';

interface LectureTableProps {
  isAll: boolean;
  popularData?: TimetableLectureRow[];
  findData?: TimetableLectureRow[];
  isLoading?: boolean;
  error?: Error | null;
}

interface LectureTableData {
  id: string;
  lectureName: string;
  credit: number;
  rating: string;
  enrollmentCount: number;
  category: string | null;
  [key: string]: string | number | boolean | null;
}

function toRow(r: TimetableLectureRow): LectureTableData {
  const id = String((r as any).id ?? '');
  const lectureName = (r as any).name ?? '강의명';
  const credit = Number((r as any).credit ?? 0) || 0;
  const rating =
    (r as any).averageRating !== undefined && (r as any).averageRating !== null
      ? String((r as any).averageRating)
      : '-';
  const enrollmentCount = Number((r as any).totalCount ?? 0) || 0;
  const category =
    LECTURE_FINDER_CATEGORY_KO[(r as any).categoryName as keyof typeof LECTURE_FINDER_CATEGORY_KO] ?? null;

  return { id, lectureName, credit, enrollmentCount, category, rating };
}

function groupByCategory(rows: LectureTableData[]) {
  return rows.reduce<Record<string, LectureTableData[]>>((acc, cur) => {
    const key = cur.category ?? '기타';
    (acc[key] ??= []).push(cur);
    return acc;
  }, {});
}

export default function LectureTable({ isAll, popularData, findData }: LectureTableProps) {
  const rows = useMemo(() => {
    const raw = popularData ?? findData ?? [];
    return raw.map(toRow);
  }, [popularData, findData]);

  const renderLectureModal = () => <LectureInsightModal />;

  if (popularData || isAll) {
    return (
      <div className="flex flex-col gap-4 py-3">
        <Table
          headerInfo={REQUIRED_LECTURE_TABLE_HEADER_INFO}
          data={rows}
          nonRenderableKey={['id']}
          renderModal={renderLectureModal}
          modalKey="LECTURE_INSIGHT"
        />
      </div>
    );
  }

  const grouped = groupByCategory(rows);
  const categories = Object.keys(grouped);

  return (
    <div className="flex flex-col gap-4 py-3">
      {categories.map((cat) => (
        <div key={cat} className="flex flex-col gap-2">
          <p className="px-2 font-semibold">{cat || '기타'}</p>
          <Table
            headerInfo={REQUIRED_LECTURE_TABLE_HEADER_INFO}
            data={grouped[cat]}
            nonRenderableKey={['id', 'category']}
            renderModal={renderLectureModal}
            modalKey="LECTURE_INSIGHT"
          />
        </div>
      ))}
    </div>
  );
}
