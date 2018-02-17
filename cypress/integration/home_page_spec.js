const mountVue = require('cypress-vue-unit-test')

describe('The Home Page', function () {
  it('successfully loads', function () {
    cy.visit('http://localhost:8080')
  })
})