/// <reference types="Cypress" />

describe('Favorite listing user flows', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  // outback is already favorited, civic is not

  it('should favorite a listing when the favorite button is clicked', () => {
    cy.login('joe@test.com', '123456');

    cy.findByRole('heading', { name: /civic/i })
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: /^favorite$/i,
        }).click();

        cy.findByRole('button', {
          name: /unfavorite/i,
        }).should('exist');
      });
  });

  it('should unfavorite a listing when the unfavorite button is clicked', () => {
    cy.login('joe@test.com', '123456');

    cy.findByRole('heading', { name: /outback/i })
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: /unfavorite/i,
        }).click();

        cy.findByRole('button', {
          name: /^favorite$/i,
        }).should('exist');
      });
  });

  it('should open login modal if favorite button clicked while not logged in', () => {
    cy.visit('/');

    cy.findByRole('heading', { name: /civic/i })
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: /^favorite$/i,
        }).click();
      });

    cy.findByRole('heading', { name: 'Login' }).should('exist');
  });

  it('should update the favorites page accordingly', () => {
    cy.login('joe@test.com', '123456');

    // VISIT FAVORITES PAGE
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my favorites/i).click();

    cy.url().should('include', '/favorites');

    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    // GO BACK TO HOME PAGE
    cy.findByRole('link', { name: /car rental/i }).click();
    cy.url().should('not.include', '/favorites');

    // FAVORITE CIVIC
    cy.findByRole('heading', { name: /civic/i })
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: /^favorite$/i,
        }).click();

        cy.findByRole('button', {
          name: /unfavorite/i,
        }).should('exist');
      });

    // UNFAVORITE OUTBACK
    cy.findByRole('heading', { name: /outback/i })
      .parent()
      .within(() => {
        cy.findByRole('button', {
          name: /unfavorite/i,
        }).click();

        cy.findByRole('button', {
          name: /^favorite$/i,
        }).should('exist');
      });

    // GO BACK TO FAVORITES PAGE
    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my favorites/i).click();

    cy.url().should('include', '/favorites');

    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');
  });
});

export {};
