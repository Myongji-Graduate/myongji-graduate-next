'use server';

import { fetchSearchTimetableLectures } from '@/app/business/services/timetable/timetable-lecture.command';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  const year = Number(searchParams.get('year'));
  const semester = Number(searchParams.get('semester'));
  const campus = searchParams.get('campus') ?? '';
  const filter = searchParams.get('filter') ?? '';
  const keyword = searchParams.get('keyword') ?? '';
  const professor = searchParams.get('professor') ?? '';
  const recommendedCategory = searchParams.get('recommendedCategory') ?? undefined;

  const data = await fetchSearchTimetableLectures(
    year,
    semester,
    campus,
    filter,
    keyword,
    professor,
    recommendedCategory,
  );

  return NextResponse.json(data);
}
