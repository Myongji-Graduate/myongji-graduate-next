'use server';

import { NextRequest, NextResponse } from 'next/server';
import { uploadTimetable } from '@/app/business/services/timetable/timetable.command';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/utils/timetable/constants';

export async function POST(req: NextRequest) {
  const { lecturesIds } = await req.json();
  const data = await uploadTimetable(CURRENT_YEAR, CURRENT_SEMESTER, lecturesIds);
  return NextResponse.json(data);
}
