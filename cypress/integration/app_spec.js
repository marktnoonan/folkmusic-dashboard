import App from "../../src/App.vue";
import router from "../../src/router";
import VueRouter from "vue-router";

const mountVue = require("cypress-vue-unit-test");

/* eslint-env mocha */
describe("Folkmusic App", () => {
  const extensions = {
    plugins: [VueRouter],
    components: {
      App
    }
  };

  const template = "<router-view />";

  beforeEach(mountVue({ template, router }, { extensions }));

  it("shows the app", () => {
    cy.contains("Folkmusic");
  });
});
