// https://stackoverflow.com/questions/76957592/error-only-async-functions-are-allowed-to-be-exported-in-a-use-server-file

export interface SignUpRequestBody {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
}
