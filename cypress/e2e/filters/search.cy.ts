/// <reference types="Cypress" />

describe('Search filters', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should correctly update search filters display based on the search filters selected', () => {
    cy.visit('/');

    cy.findByTestId('search-filters').within(() => {
      cy.findByText('Anywhere in US').should('exist');
      cy.findByText('Any Week').should('exist');
      cy.findByText('Add Passengers').should('exist');
    });

    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('combobox').type('MA');
    cy.findByRole('combobox').type('{enter}');
    cy.findByRole('button', { name: /next/i }).click();

    cy.findByRole('combobox').type('Boston');
    cy.findByRole('combobox').type('{enter}');
    cy.findByRole('button', { name: /next/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /next/i }).click();

    // PASSENGER FILTER
    for (let i = 0; i < 4; i++) {
      cy.findByRole('button', { name: /add/i }).click();
    }
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    cy.findByTestId('search-filters').within(() => {
      cy.findByText('Boston, MA').should('exist');
      cy.findByText('1 day').should('exist');
      cy.findByText('5 passengers').should('exist');
    });
  });
});

export {};
