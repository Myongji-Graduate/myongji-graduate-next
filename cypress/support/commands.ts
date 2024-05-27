/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (id, password) => {
  cy.session(
    id,
    () => {
      cy.visit('/sign-in');

      cy.get('input[name=authId]').type(id);

      // {enter} causes the form to submit
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false });

      // we should be redirected to /dashboard
      cy.url().should('include', '/my');
    },
    {
      validate: () => {
        cy.getCookie('accessToken').should('exist');
      },
    },
  );

  // our auth cookie should be present

  // UI should reflect this user being logged in
  //   cy.get('h1').should('contain', username)
});

Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}
