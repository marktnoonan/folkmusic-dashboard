const mountVue = require('cypress-vue-unit-test')

/* eslint-env mocha */
describe('Declarative rendering', () => {
	// Vue code from https://vuejs.org/v2/guide/#Declarative-Rendering
	const template = `
    <div id="app">
      {{ message }}
    </div>
  `

	const data = {
		message: 'Hello Vue!'
	}

	// that's all you need to do
	beforeEach(mountVue({template, data}))

	it('shows hello', () => {
		cy.contains('Hello Vue!')
	})

	it('changes message if data changes', () => {
		// mounted Vue instance is available under Cypress.vue
		Cypress.vue.message = 'Vue rocks!'
		cy.contains('Vue rocks!')
	})
})
