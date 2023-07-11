/// <reference types="Cypress" />

describe('Category filter', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should correctly show listings based on the category filter selected', () => {
    cy.visit('/');

    // EXPECT BOTH LISTINGS WHEN NO FILTERS SELECTED
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    // SELECT ELECTRIC FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/electric/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // SELECT SPORTS CARS FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/sports cars/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // SELECT CROSSOVERS & SUVS FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText('Crossovers & SUVs').click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');
  });

  it('should remove category filter when currently selected category is clicked again', () => {
    cy.visit('/');

    // EXPECT BOTH LISTINGS WHEN NO FILTERS SELECTED
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    // SELECT ELECTRIC FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/electric/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // DE-SELECT ELECTRIC FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/electric/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    // SELECT SPORTS CARS FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/sports cars/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // DE-SELECT SPORTS CARS FILTER
    cy.findByTestId('category-filter').within(() => {
      cy.findByText(/sports cars/i).click();
    });
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');
  });
});

export {};
