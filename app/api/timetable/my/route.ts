'use server';

import { NextRequest, NextResponse } from 'next/server';
import { fetchTimetable, deleteTimetable } from '@/app/business/services/timetable/timetable.command';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/utils/timetable/constants';

export async function GET(req: NextRequest) {
  const data = await fetchTimetable(CURRENT_YEAR, CURRENT_SEMESTER);
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const data = await deleteTimetable(CURRENT_YEAR, CURRENT_SEMESTER);
  return NextResponse.json(data);
}
