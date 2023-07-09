/// <reference types="Cypress" />

describe('Create Listing Modal', () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it('should open when "rent out your car" is clicked', () => {
    cy.login('john@test.com', '123456');

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

  it('should create a listing if the user correctly completes each step of the modal', () => {
    cy.login('john@test.com', '123456');

    cy.findByRole('button', { name: /user menu/i }).click();

    cy.findByTestId('user-menu-links').within(() => {
      cy.findByText(/rent out your car/i).click();
    });

    cy.findByRole('heading', { name: 'Rent out your car!' }).should('exist');

    // CATEGORY STEP
    cy.findByTestId('modal').within(() => {
      cy.findByText(/electric/i).click();
    });

    // LOCATION STEPS
    cy.findByRole('button', { name: /next/i }).click();

    cy.findByRole('combobox').type('MA');
    cy.findByRole('combobox').type('{enter}');
    cy.findByRole('button', { name: /next/i }).click();

    cy.findByRole('combobox').type('Boston');
    cy.findByRole('combobox').type('{enter}');
    cy.findByRole('button', { name: /next/i }).click();

    // PASSENGER COUNT STEPS
    for (let i = 0; i < 4; i++) {
      cy.findByRole('button', { name: /add/i }).click();
    }

    // test reduce button
    cy.findByRole('button', { name: /reduce/i }).click();
    cy.findByRole('button', { name: /add/i }).click();

    cy.findByRole('button', { name: /next/i }).click();

    // SKIP IMAGE UPLOAD STEP
    // b/c uses next-cloudinary widget
    // which doesn't seem to work with cypress

    // INSTEAD ADD IMAGE FILE TO REQUEST
    cy.intercept('POST', '/api/listings', (req) => {
      req.body['imageSrc'] =
        'https://res.cloudinary.com/dqrdsleqt/image/upload/v1688224999/mtgbrxdghdf49d4vfyfo.jpg';
    }).as('createListing');
    cy.findByRole('button', { name: /next/i }).click();

    // INFO STEP
    cy.findByRole('textbox', { name: /make/i }).type('Tesla');
    cy.findByRole('textbox', { name: /model/i }).type('Model Y');
    cy.findByRole('textbox', { name: /trim/i }).type('Performance AWD');
    cy.findByRole('textbox', { name: /other info/i }).type('Color: White');
    cy.findByRole('button', { name: /next/i }).click();

    // PRICE STEP
    cy.findByRole('textbox', { name: /price/i }).clear();
    cy.findByRole('textbox', { name: /price/i }).type('150');
    cy.findByRole('button', { name: /create/i }).click();

    // CLICK ON NEW LISTING CARD
    cy.findByText(/tesla model y/i).click();

    // FIND TITLE ON LISTING PAGE
    cy.findByRole('heading', {
      name: /tesla model y - performance awd/i,
    }).should('exist');
  });
});

export {};
