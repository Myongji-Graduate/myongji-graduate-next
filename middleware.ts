async function getAuth(request: NextRequest): Promise<UserInfoResponse | boolean> {
  const accessToken = request.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return false;
  }

  const validatedResult = await validateToken();

  if (!validatedResult) {
    request.cookies.delete('accessToken');
    request.cookies.delete('refreshToken');
    return false;
  }

  request.cookies.set('accessToken', validatedResult.accessToken);

  // 유저 정보 요청
  try {
    const user = await getUserInfo();
    return user;
  } catch {
    return false;
  }
}
