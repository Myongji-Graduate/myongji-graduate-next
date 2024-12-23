import { UserInfoResponse } from '@/app/business/services/user/user.type';
import UserInfoContentViewer from './user-info-content-viewer';
import { fetchCredits } from '@/app/business/services/user/user.query';

interface UserInfoContentProp {
  data: UserInfoResponse;
}

async function UserInfoContent({ data }: UserInfoContentProp) {
  const categories = await fetchCredits();
  return <UserInfoContentViewer data={data} categories={categories} />;
}

export default UserInfoContent;
