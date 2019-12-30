/* global describe, it, cy */

describe('open spec viewer with no spec given', () => {
  it('should render a message to the user', () => {
    cy.visit('/')
    cy.get('at-content-container p') // command
      .contains('No Spec has been provided. Please provide a valid `spec` query parameter.')
  })
})
