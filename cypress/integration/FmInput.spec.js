import FmInput from '../../src/components/FmInput.vue'
import showCells from '../fixtures/showCells.json' // should just use cy.fixture

const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
console.log(showCells)

showCells.forEach((show, index) => {
	const testType = show.type
	const testLabel = show.label

	describe(`"${testLabel}" fm-input (type: ${testType})`, () => {
		const template = `<fm-input :cell="${index}" />`
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
		beforeEach(mountVue({template, components}))

		it('is labelled correctly', () => {
			cy.get('span').contains(testLabel)
		})
		it('has input element of the correct type', () => {
			cy.get('input[type="' + testType + '"]')
		})
	})
})
