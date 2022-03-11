describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.get('form').should('contain', 'login')

    cy.get('#username').should('have.prop', 'type', 'text')
    cy.get('#password').should('have.prop', 'type', 'password')
  })
})