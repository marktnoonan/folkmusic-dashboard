import SmallButton from '../../src/components/SmallButton.vue'
const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
describe('Small Button', () => {
  beforeEach(mountVue(SmallButton))

  it('shows the default text', () => {
    cy.contains('Small button with no text content!')
  })
})

describe('Small button with slot and passed function', function () {

  // NOTE: the v-bind shorthand here (:) is passing a function to the component as a prop, which it then runs
  const template = `<small-button :onClick="testClick">Hello</small-button>`
  const components = {
    SmallButton: SmallButton
  }
  const methods = {
    testClick() {
      console.log('click')
      // I would like a better way to detect that this ran than emitting an event 
      //for no other reason, but it does make it easy to catch the eveny with the spy.
      this.$emit('Test Click Function Called')
      return
    }
  }
  beforeEach(mountVue({ template, components, methods }))

  it('says hello', () => {
    cy.get('button').contains('Hello').click()
  })

  it.only('runs the function passed to it', () => {
    const spy = cy.spy()
    Cypress.vue.$on('Test Click Function Called', spy)
    cy.get('button').click().click()
      .then(() => {
        expect(spy).to.be.calledTwice
      })
  })
})
