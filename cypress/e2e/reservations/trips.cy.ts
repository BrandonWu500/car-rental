/// <reference types="Cypress" />

describe('Trips', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });
});

export {};
