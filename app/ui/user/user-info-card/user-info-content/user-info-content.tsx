'use client';
import { UserInfoResponse } from '@/app/business/services/user/user.type';
import { useFetchCredits } from '@/app/store/querys/result';
import UserInfoContentViewer from './user-info-content-viewer';

interface UserInfoContentProp {
  data: UserInfoResponse;
}

function UserInfoContent({ data }: UserInfoContentProp) {
  const { data: categories } = useFetchCredits();
  return <UserInfoContentViewer data={data} categories={categories} />;
}

export default UserInfoContent;
