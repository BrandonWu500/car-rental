/// <reference types="Cypress" />

describe('Create Listing Modal', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.intercept('GET', '/api/current-user').as('getCurrentUser');
  });

  it('should open when "rent out your car" is clicked', () => {
    cy.login();

    // first fetch returns null, so need to wait for 2nd fetch
    cy.wait('@getCurrentUser');
    cy.wait('@getCurrentUser');

    cy.findByText(/rent out your car/i).click();

    cy.findByRole('heading', { name: 'Rent out your car!' }).should('exist');
  });

  it('should open login modal when "rent out your car" is clicked and user is not logged in', () => {
    cy.visit('/');

    cy.findByText(/rent out your car/i).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');
    cy.findByRole('heading', { name: 'Rent out your car!' }).should(
      'not.exist'
    );
  });
});

export {};
