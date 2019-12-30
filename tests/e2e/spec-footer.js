/* global describe, it, cy */

describe('open spec viewer with example spec', () => {
  it('should render contact information in the footer', () => {
    cy.visit('/?spec=example-specs/petstore-example.3.0.json')

    cy.get('at-api-spec-footer footer address')
      .contains('Example Organization')
      .contains('E-Mail: info@example-organization.com')

    cy.get('at-api-spec-footer footer address a')
      .contains('http://www.example-organization.com')
      .should('have.attr', 'href', 'http://www.example-organization.com')
  })
})
