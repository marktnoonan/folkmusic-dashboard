describe("The Home Page", function() {
  it("successfully loads", function() {
    cy.visit("http://localhost:8080/#/dashboard/");
  });

  it("logs the user in", function() {
    cy.get("input[type=text]").type("test@test.test");
    cy.get("input[type=password]").type("testuser");
    cy.contains("Log In").click();
  });

  it.skip("logs the user out", function() {
    cy.contains("Log Out").click();
  });
});
