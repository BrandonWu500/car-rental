/// <reference types="Cypress" />

describe('Reserve listing user flow', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should open login modal when "reserve" button is clicked and user is not logged in', () => {
    cy.visit('/');

    // CLICK ON LISTING CARD
    cy.findByText(/honda civic/i).click();

    // FIND TITLE ON LISTING PAGE
    cy.findByRole('heading', {
      name: /honda civic - type r/i,
    }).should('exist');

    cy.findByRole('button', {
      name: /^reserve$/i,
    }).click();

    cy.findByRole('heading', { name: 'Login' }).should('exist');
  });

  it('should create a same-day reservation if user clicks reserve button without selecting date range', () => {
    cy.login();

    // CLICK ON LISTING CARD
    cy.findByText(/honda civic/i).click();

    // FIND TITLE ON LISTING PAGE
    cy.findByRole('heading', {
      name: /honda civic - type r/i,
    }).should('exist');

    cy.findByRole('button', {
      name: /^reserve$/i,
    }).click();

    cy.findByText(/listing reserved/i).should('exist');

    // CONFIRM REDIRECT TO TRIPS PAGE
    cy.findByRole('heading', { name: 'Trips' }).should('exist');

    cy.findByRole('heading', {
      name: /honda civic/i,
    }).should('exist');
  });

  it('should create a reservation if user selects a valid date range', () => {
    cy.login();

    // CLICK ON LISTING CARD
    cy.findByText(/honda civic/i).click();

    // FIND TITLE ON LISTING PAGE
    cy.findByRole('heading', {
      name: /honda civic - type r/i,
    }).should('exist');

    // SELECT DATE RANGE

    // first press next month button to ensure dates aren't disabled
    cy.findByRole('button', {
      name: /next month/i,
    }).click();

    // choose start and end date
    cy.findByText('23').click();
    cy.findByText('27').click();

    cy.findByRole('button', {
      name: /^reserve$/i,
    }).click();

    cy.findByText(/listing reserved/i).should('exist');

    // CONFIRM REDIRECT TO TRIPS PAGE
    cy.findByRole('heading', { name: 'Trips' }).should('exist');

    cy.findByRole('heading', {
      name: /honda civic/i,
    }).should('exist');
  });
});

export {};
