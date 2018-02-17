import Dashboard from '../../src/components/Dashboard.vue'
const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
describe('Dashboard.vue', () => {
  beforeEach(mountVue(Dashboard))

  it('shows the dashboard', () => {
    cy.contains('Add A Show')
  
  })
})