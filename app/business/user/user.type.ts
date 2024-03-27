// https://stackoverflow.com/questions/76957592/error-only-async-functions-are-allowed-to-be-exported-in-a-use-server-file
// server action 파일에서는 async function만 export 가능

export interface SignUpRequestBody {
  authId: string;
  password: string;
  studentNumber: string;
  engLv: string;
}

export interface SignInRequestBody {
  authId: string;
  password: string;
}
