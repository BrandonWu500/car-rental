/// <reference types="Cypress" />

describe('Signup', () => {
  it('runs auth flow for user sign up, login, and logout', () => {
    cy.task('db:reset');

    cy.visit('/');

    // SIGN UP
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/sign up/i).click();

    cy.findByRole('heading', { name: 'Register' }).should('exist');

    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('test@test.com');

    cy.findByLabelText(/name/i).clear();
    cy.findByLabelText(/name/i).type('test');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('test');

    cy.findByRole('button', { name: 'Continue' }).click();

    // LOGIN WITH NEWLY CREATED USER
    cy.findByRole('heading', { name: 'Login' }).should('exist');

    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('test@test.com');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('test');

    cy.findByRole('button', { name: 'Continue' }).click();

    // LOGOUT
    cy.findByRole('button', { name: /user menu/i }).click();
    cy.findByText(/logout/i).click();
  });

  it('should show an error message if email already taken', () => {
    cy.task('db:reset');

    cy.visit('/');

    // SIGN UP WITH USER THAT DB WAS SEEDED WITH
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/sign up/i).click();

    cy.findByRole('heading', { name: 'Register' }).should('exist');

    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('john@test.com');

    cy.findByLabelText(/name/i).clear();
    cy.findByLabelText(/name/i).type('test');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('test');

    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByText(/Email taken/i).should('exist');
  });

  it('should show an error message if email is invalid', () => {
    cy.task('db:reset');

    cy.visit('/');

    // SIGN UP WITH INVALID EMAIL
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/sign up/i).click();

    cy.findByRole('heading', { name: 'Register' }).should('exist');

    cy.findByLabelText(/email/i).clear();
    cy.findByLabelText(/email/i).type('john@test');

    cy.findByLabelText(/name/i).clear();
    cy.findByLabelText(/name/i).type('test');

    cy.findByLabelText(/password/i).clear();
    cy.findByLabelText(/password/i).type('test');

    cy.findByRole('button', { name: 'Continue' }).click();

    cy.findByText(/Invalid email/i).should('exist');
  });
});
