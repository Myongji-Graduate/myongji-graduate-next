import { parseCreditDetailInfo, type AnonymousResultType } from '@/app/utils/parser/anonymous';

describe('anonymous parser', () => {
  it('detail category의 필수 강의 정보와 필수 선택 그룹을 보존한다.', () => {
    const result = {
      user: {
        studentNumber: '60000000',
        studentName: '테스트',
        completeDivision: [],
        totalCredit: 0,
        takenCredit: 0,
        graduated: false,
      },
      graduationResult: {
        chapelResult: {
          takenCount: 0,
          completed: false,
          takenChapelCredit: 0,
        },
        detailGraduationResults: [
          {
            totalCredit: 6,
            takenCredit: 3,
            graduationCategory: 'PRIMARY_BASIC_ACADEMICAL_CULTURE',
            detailCategory: [
              {
                totalCredits: 6,
                takenCredits: 3,
                takenLectures: [
                  {
                    id: 'ECO101',
                    name: '미시경제학원론',
                    credit: 3,
                    duplicateCode: 'ECO101',
                    isRevoked: 0,
                    culture: false,
                  },
                ],
                haveToLectures: [
                  {
                    id: 'ECO102',
                    name: '거시경제학원론',
                    credit: 3,
                    duplicateCode: 'ECO102',
                    isRevoked: 0,
                    culture: false,
                  },
                ],
                mandatoryLectures: [
                  {
                    id: 'ECO101',
                    name: '미시경제학원론',
                    credit: 3,
                    duplicateCode: 'ECO101',
                    isRevoked: 0,
                    culture: false,
                  },
                ],
                mandatoryOptions: [
                  {
                    name: '경제학전공 지정필수',
                    requiredCount: 1,
                    takenCount: 1,
                    candidates: [
                      {
                        id: 'ECO101',
                        name: '미시경제학원론',
                        credit: 3,
                        duplicateCode: 'ECO101',
                        isRevoked: 0,
                        culture: false,
                      },
                      {
                        id: 'ECO102',
                        name: '거시경제학원론',
                        credit: 3,
                        duplicateCode: 'ECO102',
                        isRevoked: 0,
                        culture: false,
                      },
                    ],
                  },
                ],
                detailCategoryName: '학문기초교양(경제학전공)',
                normalLeftCredit: 0,
                freeElectiveLeftCredit: 0,
                completed: false,
                satisfiedMandatory: false,
              },
            ],
            normalLeftCredit: 0,
            freeElectiveLeftCredit: 0,
            completed: false,
          },
        ],
        normalCultureGraduationResult: {
          totalCredit: 0,
          takenCredit: 0,
          categoryName: '공통교양',
          completed: false,
        },
        freeElectiveGraduationResult: {
          totalCredit: 0,
          takenCredit: 0,
          categoryName: '자유선택',
          completed: false,
        },
        totalCredit: 0,
        takenCredit: 0,
        graduated: false,
      },
    } as AnonymousResultType;

    const parsed = parseCreditDetailInfo(result, 'PRIMARY_BASIC_ACADEMICAL_CULTURE');

    expect(parsed.detailCategory[0].mandatoryLectures).toEqual([
      expect.objectContaining({
        id: 'ECO101',
        name: '미시경제학원론',
        credit: 3,
      }),
    ]);
    expect(parsed.detailCategory[0].mandatoryOptions).toEqual([
      expect.objectContaining({
        name: '경제학전공 지정필수',
        requiredCount: 1,
        takenCount: 1,
        candidates: expect.arrayContaining([
          expect.objectContaining({ id: 'ECO101', name: '미시경제학원론', credit: 3 }),
          expect.objectContaining({ id: 'ECO102', name: '거시경제학원론', credit: 3 }),
        ]),
      }),
    ]);
  });
});
