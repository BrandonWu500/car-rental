/// <reference types="Cypress" />

describe('Favorite listing user flows', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should favorite a listing when the favorite button is clicked', () => {
    cy.login('joe@test.com', '123456');

    cy.findByRole('button', {
      name: /^favorite$/i,
    }).click();

    cy.findByRole('button', {
      name: /unfavorite/i,
    }).should('exist');
  });
});

export {};
