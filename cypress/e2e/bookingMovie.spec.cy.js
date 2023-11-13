import seats from "../fixtures/seats.json";

describe("Бронирование фильма в доступный зал", () => {
  const selector = require("../fixtures/selector");

  it("Должен бронировать фильм из админки", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.fixture("loginAdmin.json").as("loginAdmin");
    cy.get("@loginAdmin").then((admin) => {
      cy.get(selector.login).type(admin.user.email);
      cy.get(selector.pass).type(admin.user.password);
      cy.contains("Авторизоваться").click();
      return cy
        .get(".conf-step__movie-title") //не работает, если убмраю в фикстуру
        .eq(1)
        .invoke("text")
        .then((text) => {
          const titleMovie = text.trim();
          cy.visit("/"); // Переход к странице бронирования
          cy.get(".page-nav__day:nth-of-type(4)").click(); //не работает, если убмраю в фикстуру
          cy.contains(titleMovie)
            .get(
              ":nth-child(2) > .movie-seances__hall > .movie-seances__list > .movie-seances__time-block > .movie-seances__time"
            )
            .click();

          seats.forEach((seat) => {
            cy.get(
              `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
            ).click();

            cy.contains("Забронировать").click();
            cy.get("h2").contains("Вы выбрали билеты:").should("be.visible");
            cy.contains("Получить код бронирования").click();
            cy.contains("Электронный билет").should("be.visible");
          });
        });
    });
  });
});
