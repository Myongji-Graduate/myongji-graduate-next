describe('DEV-122 synthetic taken-lecture UI contract', () => {
  const errors: string[] = [];
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      const original = win.console.error;
      win.console.error = (...args) => {
        errors.push(args.map(String).join(' ').slice(0, 500));
        original(...args);
      };
    });
  });
  afterEach(() => {
    cy.task('diagnostics', errors);
  });
  it('adds and deletes a course, updates graduation results and survives reloads', () => {
    // Prevent optional third-party widgets/analytics from contacting external services.
    cy.intercept('https://**', { statusCode: 204, body: '' });
    cy.login('synthetic122', 'synthetic-only');
    cy.visit('/my');
    cy.contains('합성학생').should('be.visible');
    cy.dataCy('taken-lecture-delete-model-trigger-122').should('not.exist');
    cy.dataCy('result-page-link').click();
    cy.dataCy('remain-credit').should('have.text', '9');
    cy.visit('/my');
    cy.dataCy('open-lecture-search-dialog-button').click();
    cy.dataCy('search-lecture-input').type('합성검증과목');
    // Activate the visible DOM button once; Vaul captures Cypress 13 pointer
    // events and Cypress's Enter simulation submits this form twice.
    cy.dataCy('add-lecture-button-합성검증과목')
      .should('be.visible')
      .and('not.be.disabled')
      .then(($button) => {
        ($button[0] as HTMLButtonElement).click();
      });
    cy.contains('과목 추가에 성공했습니다').should('be.visible');
    cy.get('[role="dialog"]').type('{esc}');
    cy.dataCy('taken-lecture-delete-model-trigger-122').should('exist');
    cy.reload();
    cy.dataCy('taken-lecture-delete-model-trigger-122').should('exist');
    cy.dataCy('result-page-link').click();
    cy.dataCy('remain-credit').should('have.text', '6');
    cy.reload();
    cy.dataCy('remain-credit').should('have.text', '6');
    cy.screenshot('after-add-and-reload');
    cy.visit('/my');
    cy.dataCy('taken-lecture-delete-model-trigger-122').invoke('css', 'opacity', '1').click();
    cy.dataCy('confirm-button').click();
    cy.dataCy('taken-lecture-delete-model-trigger-122').should('not.exist');
    cy.reload();
    cy.dataCy('taken-lecture-delete-model-trigger-122').should('not.exist');
    cy.dataCy('result-page-link').click();
    cy.dataCy('remain-credit').should('have.text', '9');
    cy.reload();
    cy.dataCy('remain-credit').should('have.text', '9');
    cy.request(`${Cypress.env('syntheticApi')}/__state`).then(({ body }) => {
      cy.wrap(body.added).should('eq', false);
      cy.wrap(body.takenCredit).should('eq', 3);
      cy.wrap(
        body.requests.filter(
          (r: { method: string; path: string }) => r.method === 'POST' && r.path === '/taken-lectures',
        ),
      ).should('have.length', 1);
      cy.wrap(
        body.requests.filter(
          (r: { method: string; path: string }) => r.method === 'DELETE' && r.path === '/taken-lectures/122',
        ),
      ).should('have.length', 1);
    });
    cy.screenshot('after-delete-and-reload');
  });
});
