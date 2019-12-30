/* global describe, it, cy */

describe('content-navigation for example-spec', () => {
  it('should render all resources as nav entries', () => {
    cy.visit('/?spec=example-specs/petstore-example.3.0.json')

    cy.get('at-content-navigation h3')
      .contains('Resources')

    cy.get('at-content-navigation ul').children().should('have.length', 2)

    cy.get('at-content-navigation ul').children().then(childs => {
      cy.wrap(childs[0]).within(first => {
        cy.get('a').contains('Pet Collection') // Links with `x-resource-name` should be displayed with it
        cy.get('.link-rel').contains('ps:pet-list')
      })

      cy.wrap(childs[1]).within(second => {
        cy.get('a').contains('/pets/{petId}') // Links without `x-resource-name` should be displayed with path instead
        cy.get('.link-rel').contains('ps:pet')
      })
    })
  })
})
