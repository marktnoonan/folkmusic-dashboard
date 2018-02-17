import App from '../../src/App.vue'
const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
describe('Folkmusic App', () => {
  beforeEach(mountVue(App))

  it('shows the app', () => {
    cy.contains('Folkmusic')

  })
})