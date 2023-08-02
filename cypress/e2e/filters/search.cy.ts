/// <reference types="Cypress" />

describe('Search filters', () => {
  beforeEach(() => {
    cy.resetDB();
    cy.seed();
  });

  it('should correctly update search filters display based on the search filters selected', () => {
    cy.login('john@test.com', '123456');

    cy.findByTestId('search-filters').within(() => {
      cy.findByText('Anywhere in US').should('exist');
      cy.findByText('Any Week').should('exist');
      cy.findByText('Add Passengers').should('exist');
    });

    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('textbox').type('MA');
    cy.findByRole('button', { name: /^next$/i }).click();

    cy.findByRole('textbox').type('Boston');
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

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

  it('should correctly update listings displayed based on the location filters selected', () => {
    cy.login('john@test.com', '123456');

    // EXPECT BOTH LISTINGS WHEN NO FILTERS SELECTED
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('textbox').type('MA');
    cy.findByRole('button', { name: /^next$/i }).click();

    cy.findByRole('textbox').type('Boston');
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    // EXPECT NO LISTINGS SINCE NO CAR LISTINGS IN BOSTON
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // TRY DIFFERENT LOCATION
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('MI');
    cy.findByRole('button', { name: /^next$/i }).click();

    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('Ann Arbor');
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');
  });

  it('should correctly update listings displayed based on the date filters selected', () => {
    cy.login('john@test.com', '123456');

    // EXPECT BOTH LISTINGS WHEN NO FILTERS SELECTED
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('CA');
    cy.findByRole('button', { name: /^next$/i }).click();

    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('Los Angeles');
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    // JANE HAS ALREADY RESERVED CIVIC ON SAME DAY
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // TRY DIFFERENT DATE
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('button', { name: /^next$/i }).click();
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER

    // SELECT DATE RANGE

    // first press next month button to ensure dates aren't disabled
    cy.findByRole('button', {
      name: /next month/i,
    }).click();

    // choose start and end date
    cy.findByText('13').click();
    cy.findByText('17').click();
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');
  });

  it('should correctly update listings displayed based on the passenger count selected', () => {
    cy.login('john@test.com', '123456');

    // EXPECT BOTH LISTINGS WHEN NO FILTERS SELECTED
    cy.findByRole('heading', { name: /civic/i }).should('exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');

    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('MI');
    cy.findByRole('button', { name: /^next$/i }).click();

    cy.findByRole('textbox').clear();
    cy.findByRole('textbox').type('Ann Arbor');
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    for (let i = 0; i < 5; i++) {
      cy.findByRole('button', { name: /add/i }).click();
    }
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    // NO CARS LISTED WITH A PASSENGER COUNT GREATER THAN 5
    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('not.exist');

    // TRY DIFFERENT PASSENGER COUNT
    cy.findByRole('button', { name: /search/i }).click();
    cy.findByRole('heading', { name: /filters/i }).should('exist');

    // LOCATION FILTERS
    cy.findByRole('button', { name: /^next$/i }).click();
    cy.findByRole('button', { name: /^next$/i }).click();

    // DATE FILTER
    // DEFAULT SELECT IS SAME DAY
    cy.findByRole('button', { name: /^next$/i }).click();

    // PASSENGER FILTER
    // passenger count currently at 6
    cy.findByRole('button', { name: /reduce/i }).click();
    cy.findByTestId('modal').within(() => {
      cy.findByRole('button', { name: /search/i }).click();
    });

    cy.findByRole('heading', { name: /civic/i }).should('not.exist');
    cy.findByRole('heading', { name: /outback/i }).should('exist');
  });
});

export {};
