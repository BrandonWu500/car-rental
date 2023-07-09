/// <reference types="Cypress" />

describe('Car reservations', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should show reservations that other users have made on the car when logged in as owner', () => {
    cy.login('joe@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my cars/i).click();

    cy.findByRole('button', { name: /view reservations/i }).click();

    cy.findByRole('heading', {
      name: /reservations/i,
    }).should('exist');

    cy.findByRole('button', {
      name: /cancel jane's reservation/i,
    }).should('exist');
  });
});

export {};
