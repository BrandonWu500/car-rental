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
// Cypress.Commands.add('login', (email, password) => { ... })
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
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      resetDB(): Chainable<void>;
      login(): Chainable<void>;
    }
  }
}

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('resetDB', () => {
  cy.task('db:reset');
});

Cypress.Commands.add('login', () => {
  cy.visit('/');

  // LOG IN WITH TEST USER
  cy.findByRole('button', { name: /user menu/i }).click();

  cy.findByText(/login/i).click();

  cy.findByRole('heading', { name: 'Login' }).should('exist');

  cy.findByLabelText(/email/i).clear();
  cy.findByLabelText(/email/i).type('john@test.com');

  cy.findByLabelText(/password/i).clear();
  cy.findByLabelText(/password/i).type('123456');

  cy.findByRole('button', { name: 'Continue' }).click();
});
