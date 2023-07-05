describe('Navigation', () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it('should navigate to the trips page', () => {
    cy.login();

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my trips/i).click();

    cy.url().should('include', '/trips');

    // since user db is seeded with has no trips
    cy.findByRole('heading', { name: /no trips found/i }).should('exist');
  });
});

export {};
