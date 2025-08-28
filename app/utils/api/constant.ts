export const ERROR_CODE = {
  // USER
  UNREGISTERED_USER: '등록되지 않은 사용자입니다.',
  INVALIDATED_STUDENT_NUMBER_TYPE: '잘못된 형식의 학번입니다.',
  INVALIDATED_PASSWORD_TYPE: '잘못된 형식의 비밀번호입니다.',
  MISMATCHED_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NOT_FOUND_AUTHID: '존재하지 않는 아이디입니다.',
  INVALIDATED_AUTHID_TYPE: '잘못된 형식의 아이디입니다.',
  INCORRECT_PASSWORD: '비밀번호가 올바르지 않습니다.',
  DUPLICATED_STUDENT_NUMBER: '이미 등록된 학번입니다.',
  DUPLICATED_AUTHID: '이미 사용 중인 아이디입니다.',
  UNSUPPORTED_STUDENT_NUMBER: '지원하지 않는 학번입니다.',
  INVALIDATED_AUTH_TOKEN: '유효하지 않은 인증 토큰입니다. 다시 로그인해주세요.',

  // COMMON
  INTERNAL_SEVER_ERROR: '예상치 못한 에러가 발생했습니다.',

  // RESULT
  INVALIDATED_GRADUATION_CATEGORY: '올바르지 않은 졸업 요건 구분입니다.',
  UNFITTED_GRADUATION_CATEGORY: '졸업 요건에 부합하지 않습니다.',

  // LECTURE (아래 세개 모두 PDF Parsing에서 발생하는 에러)
  INCORRECT_STUDENT_NUMBER: '학번과 일치하는 성적PDF를 입력해주세요.',
  NON_EXISTED_LECTURE: '알수없는 수강과목이 존재해요. 채널톡으로 문의해주세요',
  UNSUPPORTED_STUDENT_CATEGORY: '현재 지원하지않는 학번이에요.',
} as const;
