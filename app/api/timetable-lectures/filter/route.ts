'use server';

import { fetchSearchTimetableLectures } from '@/app/business/services/timetable/timetable-lecture.command';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@/app/utils/timetable/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const campus = url.searchParams.get('campus') ?? '';
  const filter = url.searchParams.get('filter') ?? '';
  const keyword = url.searchParams.get('keyword') ?? '';
  const professor = url.searchParams.get('professor') ?? '';
  const recommendedCategory = url.searchParams.get('recommendedCategory') ?? undefined;

  // year, semester를 상수로 통일
  const data = await fetchSearchTimetableLectures({
    year: CURRENT_YEAR,
    semester: CURRENT_SEMESTER,
    campus,
    filter,
    keyword,
    professor,
    recommendedCategory,
  });

  return NextResponse.json(data);
}
