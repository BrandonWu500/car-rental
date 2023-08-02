describe('Load more listings user flow', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seedMany(); // seeds with 8 listings
  });

  it('should load at most 3 more listings when the user presses the load more button', () => {
    cy.visit('/');
    cy.findAllByRole('img', { name: /listing/i }).should('have.length', 3);
    cy.findByRole('button', { name: /load more/i }).click();
    cy.findAllByRole('img', { name: /listing/i }).should('have.length', 6);
  });

  it('should not show the load more button if there are no more listings left', () => {
    cy.visit('/');
    cy.findAllByRole('img', { name: /listing/i }).should('have.length', 3);
    cy.findByRole('button', { name: /load more/i }).click();
    cy.findAllByRole('img', { name: /listing/i }).should('have.length', 6);
    cy.findByRole('button', { name: /load more/i }).click();
    cy.findAllByRole('img', { name: /listing/i }).should('have.length', 8);
    cy.findByRole('button', { name: /load more/i }).should('not.exist');
  });
});

export {};
