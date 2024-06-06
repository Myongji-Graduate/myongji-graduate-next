describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.window().invoke(
      // name of the method
      'resetMockDB',
    );
    cy.login('admin', 'admin');
  });

  it('critical path', () => {
    cy.visit('/my');

    cy.dataCy('result-page-link').click();

    cy.dataCy('remain-credit').should('contain', 82);
  });

  it('add lecture', () => {
    cy.visit('/my');

    cy.dataCy('open-lecture-search-dialog-button').click();

    cy.dataCy('search-lecture-input').type('영어1');

    cy.dataCy('lecture-영어1', { timeout: 10000 }).should('exist');

    cy.dataCy('add-lecture-button-영어1').click();

    cy.contains('과목 추가에 성공했습니다').should('exist');
  });

  it('delete lecture', () => {
    const testLectureIds = [1, 2, 3];
    cy.visit('/my');
    cy.window().invoke(
      // name of the method
      'addTakenLecture',
      testLectureIds,
    );
    cy.visit('/my');

    deleteLecture(testLectureIds[0]);

    deleteLecture(testLectureIds[1]);

    deleteLecture(testLectureIds[2]);

    // command로 뺄까?
    function deleteLecture(lectureId: number) {
      cy.dataCy(`taken-lecture-delete-model-trigger-${lectureId}`).click();

      cy.dataCy('confirm-button').click();

      cy.dataCy(`taken-lecture-delete-model-trigger-${lectureId}`).should('not.exist');
    }
  });

  it('check remain lecture', () => {
    cy.visit('/my');

    cy.dataCy('result-page-link').click();

    cy.dataCy('COMMON_CULTURE-button').click();

    cy.dataCy('lecture-toggle').click();

    cy.contains('영어1').should('exist');
  });
});
