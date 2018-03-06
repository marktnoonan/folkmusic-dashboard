import Dashboard from "../../src/components/Login.vue";
const mountVue = require("cypress-vue-unit-test");

/* eslint-env mocha */
describe("Login.vue", () => {
  beforeEach(mountVue(Dashboard));

  it("shows the login screen", () => {
    cy.contains("Log In");
  });
});
