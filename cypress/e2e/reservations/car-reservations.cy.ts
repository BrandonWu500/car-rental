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

  it("should cancel the user's reservation when the cancel reservation button is clicked and logged in as owner", () => {
    cy.login('joe@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my cars/i).click();

    cy.findByRole('button', { name: /view reservations/i }).click();

    cy.findByRole('heading', {
      name: /^reservations$/i,
    }).should('exist');

    cy.findByRole('button', {
      name: /cancel jane's reservation/i,
    }).click();

    cy.findByRole('heading', {
      name: /no reservations found/i,
    }).should('exist');

    cy.logout();

    // NOW LOGIN AS USER 2 TO CONFIRM TRIP WAS CANCELLED ON THEIR END

    cy.login('jane@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();
    cy.findByTestId('user-menu-links').within(() => {
      cy.findByText(/my trips/i).click();
    });

    cy.findByRole('heading', {
      name: /no trips found/i,
    }).should('exist');
  });
});

export {};
