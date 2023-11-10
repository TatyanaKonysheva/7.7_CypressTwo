describe("Login Admin", () => {
  const selector = require("../fixtures/selector");
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.fixture("loginAdmin.json").as("loginAdmin");
  });

  it("Successful login admin", () => {
    cy.get("@loginAdmin").then((admin) => {
      cy.get(selector.login).type(admin.user.email);
      cy.get(selector.pass).type(admin.user.password);
      cy.contains("Авторизоваться").click();
      cy.contains("Администраторская").should("be.visible");
    });
  });

  it("False login admin", () => {
    cy.get("@loginAdmin").then((admin) => {
      cy.get(selector.login).type(admin.falseUser.email);
      cy.get(selector.pass).type(admin.falseUser.password);
      cy.contains("Авторизоваться").click();
      cy.contains("Ошибка авторизации!").should("be.visible");
    });
  });

  it("Login admin with empty password", () => {
    cy.get("@loginAdmin").then((admin) => {
      cy.get(selector.login).type(admin.emptyPass.email);

      cy.contains("Авторизоваться").click();
      cy.get(selector.pass)
        .then(($el) => $el[0].checkValidity())
        .should("be.false");
      cy.get(selector.pass)
        .then(($el) => $el[0].validationMessage)
        .should("contain", "Заполните это поле.");
    });
  });
});
