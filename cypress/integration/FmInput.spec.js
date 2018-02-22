import FmInput from '../../src/components/FmInput.vue'
import showCells from '../fixtures/showCells.json' // should just use cy.fixture

const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
describe('fm-input', () => {
  beforeEach(mountVue(FmInput))

  it('renders a label element', () => {
    cy.get('label')
  })
  it('includes a span and input element', () => {
    cy.get('label')
      .get('span')
      .get('input')
  })
})

describe('fm-input with cell passed', () => {

  // will put the array of showCells in a fixture and loop over them here.

  const testType = 'text'
  const testLabel = 'Venue'
  const template = `<fm-input :cell="{type: '${testType}', content: '', label: '${testLabel}'}" />`
  const components = {
    FmInput: FmInput
  }
  // const methods = {
  //   testClick() {
  //     console.log('click')
  //     // I would like a better way to detect that this ran than emitting an event 
  //     //for no other reason, but it does make it easy to catch the eveny with the spy.
  //     this.$emit('Test Click Function Called')
  //     return
  //   }
  // }
  beforeEach(mountVue({ template, components }))

  it('is labelled correctly', () => {
    cy.get('span').contains(testLabel)
  })
})



