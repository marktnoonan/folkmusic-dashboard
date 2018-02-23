
describe('The Home Page', function () {
  
  it.only('successfully loads', function () {
    cy.visit('http://localhost:8080/#/dashboard/')
  })

  it('logs the user in', function () {
    cy.get('input[type=text]')
      .type('test@test.test')
    cy.get('input[type=password]')
      .type('testuser{enter}')
    
  })

  it('logs the user out', function () {
    cy.contains('Log Out').click()
  })
})

