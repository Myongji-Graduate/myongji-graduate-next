export const RESULT_CATEGORY = {
  COMMON_CULTURE: '일반교양',
  CORE_CULTURE: '핵심교양',
  PRIMARY_MANDATORY_MAJOR: '전공필수',
  PRIMARY_ELECTIVE_MAJOR: '전공선택',
  DUAL_MANDATORY_MAJOR: '전공필수',
  DUAL_ELECTIVE_MAJOR: '전공선택',
  SUB_MAJOR: '전공선택',
  PRIMARY_BASIC_ACADEMICAL_CULTURE: '학문기초교양',
  DUAL_BASIC_ACADEMICAL_CULTURE: '학문기초교양',
  NORMAL_CULTURE: '일반교양',
  FREE_ELECTIVE: '자유선택',
  CHAPEL: '채플',
} as const;

export type ResultCategoryKey = (typeof RESULT_CATEGORY)[keyof typeof RESULT_CATEGORY];
