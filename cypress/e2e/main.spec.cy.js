describe("Main page", () => {
  const selector = require("../fixtures/selector");

  beforeEach(() => {
    cy.visit("/");
  });

  it("should display 7 days", () => {
    cy.get(selector.days).should("have.length", 7);
  });

  it("should 3 movie", () => {
    cy.get(selector.movie).should("have.length", 3);
  });

  it("should title page", () => {
    cy.get(selector.headerTitle).should("be.visible");
  });
});
