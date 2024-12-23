export const ERROR_CODE = {
  // USER
  UNREGISTERED_USER: '',
  INVALIDATED_STUDENT_NUMBER_TYPE: '',
  INVALIDATED_PASSWORD_TPYE: '',
  MISMATCHED_PASSWORD: '',
  NOT_FOUND_AUTHID: '',
  INVALIDATED_AUTHID_TYPE: '',
  INCORRECT_PASSWORD: '',
  DUPLICATED_STUDENT_NUMBER: '',
  DUPLICATED_AUTHID: '',
  UNSUPPORTED_STUDENT_NUMBER: '',
  INVALIDATED_AUTH_TOKEN: '',

  // COMMON
  INTERNAL_SEVER_ERROR: '예상치 못한 에러가 발생했습니다.',

  // RESULT
  INVALIDATED_GRADUATION_CATEGORY: '',
  UNFITTED_GRADUATION_CATEGORY: '',

  // LECTURE (아래 세개 모두 PDF Parsing에서 발생하는 에러)
  INCORRECT_STUDENT_NUMBER: '',
  NON_EXISTED_LECTURE: '',
  UNSUPPORTED_STUDENT_CATEGORY: '',
} as const;
