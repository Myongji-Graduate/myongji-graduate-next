describe('The Home Page', () => {
  beforeEach(() => {
    cy.login('admin', 'admin');
    // cy.visit('/my');
    // cy.window().invoke(
    //   // name of the method
    //   'resetMockData',
    // );
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
});
