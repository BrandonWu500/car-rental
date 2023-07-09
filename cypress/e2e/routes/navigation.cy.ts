describe('Navigation', () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it('should navigate to the trips page', () => {
    cy.login('john@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my trips/i).click();

    cy.url().should('include', '/trips');

    // since user db is seeded with has no trips
    cy.findByRole('heading', { name: /no trips found/i }).should('exist');
  });

  it('should navigate to home page', () => {
    cy.login('john@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my trips/i).click();

    cy.findByRole('link', { name: /car rental/i }).click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // since db is seeded with no listings
    cy.findByRole('heading', { name: /no exact matches/i }).should('exist');
  });

  it('should navigate to the favorites page', () => {
    cy.login('john@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my favorites/i).click();

    cy.url().should('include', '/favorites');

    // since user db is seeded with has no favorites
    cy.findByRole('heading', { name: /no favorites found/i }).should('exist');
  });

  it('should navigate to the cars page', () => {
    cy.login('john@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByText(/my cars/i).click();

    cy.url().should('include', '/cars');

    // since user db is seeded with has no cars
    cy.findByRole('heading', { name: /no cars found/i }).should('exist');
  });
});

export {};
