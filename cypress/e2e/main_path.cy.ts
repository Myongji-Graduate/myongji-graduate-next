describe('The Home Page', () => {
  it('critical path', () => {
    cy.login('admin', 'admin');

    cy.visit('/my');

    cy.dataCy('result-page-link').click();

    cy.dataCy('remain-credit').should('contain', 82);
  });

  it('add lecture', () => {
    cy.login('admin', 'admin');

    cy.visit('/my');

    cy.dataCy('open-lecture-search-dialog-button').click();

    cy.dataCy('search-lecture-input').type('영어1');
    // cy.dataCy('search-lecture-button').click();

    cy.dataCy('lecture-영어1', { timeout: 10000 }).should('exist');

    cy.dataCy('add-lecture-button-영어1').click();

    // cy.dataCy('lecture-list').should('have.length', 1);
  });
});
