/// <reference types="Cypress" />

describe('Create Listing Modal', () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it('should open when "rent out your car" is clicked', () => {
    cy.login();

    cy.findByTestId('current-user');

    cy.findByText(/rent out your car/i).click();

    cy.findByRole('heading', { name: 'Rent out your car!' }).should('exist');
  });

  it('should open login modal when "rent out your car" is clicked and user is not logged in', () => {
    cy.visit('/');

    cy.findByText(/rent out your car/i).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');
    cy.findByRole('heading', { name: 'Rent out your car!' }).should(
      'not.exist'
    );
  });

  it('should create a listing if the user correctly completes each step of the modal', () => {
    cy.login();

    cy.findByTestId('current-user');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByTestId('user-menu-links').within(() => {
      cy.findByText(/rent out your car/i).click();
    });

    cy.findByRole('heading', { name: 'Rent out your car!' }).should('exist');

    cy.findByTestId('modal').within(() => {
      cy.findByText(/electric/i).click();
    });
    cy.findByRole('button', { name: /next/i }).click();

    cy.findByRole('combobox').type('MA');
    cy.findByRole('button', { name: /next/i }).click();

    cy.findByRole('combobox').type('Boston');
    cy.findByRole('button', { name: /next/i }).click();

    for (let i = 0; i < 4; i++) {
      cy.findByRole('button', { name: /add/i }).click();
    }

    // test reduce button
    cy.findByRole('button', { name: /reduce/i }).click();
    cy.findByRole('button', { name: /add/i }).click();

    cy.findByRole('button', { name: /next/i }).click();
  });
});

export {};
