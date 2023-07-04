/// <reference types="Cypress" />

describe('Login', () => {
  it('should log in the user with valid credentials', () => {
    cy.task('db:reset');

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

    // LOGOUT
    cy.findByRole('button', { name: /user menu/i }).click();
    cy.findByText(/logout/i).should('exist');
  });

  // it('should should an error message with missing or invalid credentials', () => {
  //   cy.task('db:reset');

  //   cy.visit('/');

  //   cy.findByRole('button', { name: /user menu/i }).click();

  //   cy.findByText(/login/i).click();

  //   cy.findByRole('heading', { name: 'Login' }).should('exist');

  //   cy.findByLabelText(/email/i).clear();
  //   cy.findByLabelText(/email/i).type('john@test.com');

  //   cy.findByLabelText(/password/i).clear();
  //   cy.findByLabelText(/password/i).type('123456');

  //   cy.findByRole('button', { name: 'Continue' }).click();

  //   // LOGOUT
  //   cy.findByRole('button', { name: /user menu/i }).click();
  //   cy.findByText(/logout/i).should('exist');
  // });
});
