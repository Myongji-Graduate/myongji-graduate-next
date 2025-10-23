import { fetchUser } from '@/app/business/services/user/user.query';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await fetchUser();
    return NextResponse.json(user);
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return NextResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: error?.response?.status ?? 500 });
  }
}
