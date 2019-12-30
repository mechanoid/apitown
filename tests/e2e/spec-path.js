/* global describe, it, cy */

describe('spec path rendering for example-spec', () => {
  it('should render path content for all paths', () => {
    cy.visit('/?spec=example-specs/petstore-example.3.0.json')
  })
})
