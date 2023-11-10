import tests from "../fixtures/seats.json";

describe("Movie tickets reservation screen", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru");
  });

  it("should display 7 days", () => {
    cy.get(".page-nav__day").should("have.length", 7);
  });

  /*  it("should select seats", () => {
    //cy.get(".page-nav__day:nth-of-type(4)").click();
    cy.get(".page-nav__day").eq(5).click();
    cy.get(".movie").first().contains("11:00").click();
    cy.fixture(`seats`).then((seats) => {
      seats.forEach((seat) => {
        cy.get(
          `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
      }); // используется тольоко из теста
      //const seats = require("../fixtures/seats.json");
      //seats.forEach((seat) => {
      //cy.get(
      //  `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      //).click();
    });
  });*/

  tests.forEach((test) => {
    it.only(test.name, () => {
      cy.get(".page-nav__day").eq(5).click();
      cy.get(".movie").first().contains("11:00").click();
      test.data.forEach((seat) => {
        cy.get(
          `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
        ).click();
      });
    });
  });
});
