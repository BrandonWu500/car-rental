/// <reference types="Cypress" />

describe('Car reservations', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });
});

export {};
