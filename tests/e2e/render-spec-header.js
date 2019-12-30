/* global describe, it, cy */

describe('open spec viewer with example spec', () => {
  it('should render all meta information in the header', () => {
    cy.visit('/?spec=example-specs/petstore-example.3.0.json')

    cy.get('at-api-spec-header header > h1')
      .contains('Swagger Petstore')

    cy.get('at-api-spec-header .meta-info')
      .contains('Version: 1.0.0')

    cy.get('at-api-spec-header .meta-info > a')
      .contains('MIT')
      .should('have.attr', 'href', 'https://opensource.org/licenses/MIT')

    cy.get('at-api-spec-header header > p')
      .contains('A little, very basic, OpenAPI example, describing a petstore API')
  })
})
