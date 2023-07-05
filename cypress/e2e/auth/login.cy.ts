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

  it('should show an error message with invalid credentials', () => {
    cy.task('db:reset');

    cy.visit('/');

    // OPEN LOGIN
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/login/i).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');

    // INVALID EMAIL
    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('john1@test.com');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('123456');

    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByText(/Invalid Credentials/i);

    // INVALID PASSWORD
    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('john@test.com');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('12345');

    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByText(/Invalid Credentials/i);
  });

  it('should focus the missing required input', () => {
    cy.task('db:reset');

    cy.visit('/');

    // OPEN LOGIN
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/login/i).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');

    // MISSING EMAIL
    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByLabelText(/email/i).should('have.focus');
    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('john@test.com');

    // MISSING PASSWORD
    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByLabelText(/password/i).should('have.focus');
    cy.findByLabelText(/password/i).type('123456');

    // SUCCESSFUL LOGIN
    cy.findByRole('button', { name: 'Continue' }).click();
  });
});
