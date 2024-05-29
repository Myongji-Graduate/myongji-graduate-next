describe('The Home Page', () => {
  it('critical path', () => {
    cy.login('admin', 'admin');

    cy.visit('/my');

    cy.dataCy('result-page-link').click();

    cy.dataCy('remain-credit').should('contain', 82);
  });
});
