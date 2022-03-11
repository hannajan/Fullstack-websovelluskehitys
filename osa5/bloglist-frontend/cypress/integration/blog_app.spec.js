describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testuser',
      username: 'test',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.get('form').should('contain', 'login')

    cy.get('#username').should('have.prop', 'type', 'text')
    cy.get('#password').should('have.prop', 'type', 'password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('secret')
      cy.get('button').click()

      cy.contains('Testuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('button').click()

      cy.get('.notification').should('contain', 'Wrong username or password!')
      cy.get('.notification').should('have.css', 'color', 'rgb(128, 128, 128)')
    })
  })
})