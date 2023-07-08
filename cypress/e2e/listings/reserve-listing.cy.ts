/// <reference types="Cypress" />

describe('Reserve listing user flow', () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it('should open login modal when "reserve" button is clicked and user is not logged in', () => {
    cy.visit('/');

    // CLICK ON LISTING CARD
    cy.findByText(/honda civic/i).click();

    // FIND TITLE ON LISTING PAGE
    cy.findByRole('heading', {
      name: /honda civic - type r/i,
    }).should('exist');

    cy.findByRole('button', {
      name: /^reserve$/i,
    }).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');
  });
});

export {};
