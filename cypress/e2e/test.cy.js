it('test', () => {
  // open user menu
  cy.visit('/');
  cy.findByRole('button', { name: /user menu/i }).click();
});
