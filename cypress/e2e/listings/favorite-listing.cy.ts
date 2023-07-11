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
});

export {};
