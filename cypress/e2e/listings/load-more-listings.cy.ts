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
});

export {};
