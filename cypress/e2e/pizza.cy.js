//login activeuser true yapmayı unutma
describe("HomePizza", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("finds an element", () => {
      cy.get('[href="/"]');
    });
    it("finds an element", () => {
      cy.get(":nth-child(2) > #order-pizza");
    });
  
  
    it("checks for an element", () => {
      cy.get(".sc-bcXHqe").click();
      cy.url().should("include", "/pizza");
    });
  
    it("Pizza İsim", () => {
      cy.get(".sc-bcXHqe").click();
      cy.get("#name-input")
        .type("Dallas")
        .should("have.value", "Dallas");
  
  
      cy.get("#size-dropdown")
        .select("Küçük")
        .should("have.value", "Küçük");
  
      cy.get("#size-dropdown")
        .select("Pizza Boyutu Seçiniz")
        .should("have.value", "");
  
      
      cy.get(".cy-submit").should("be.disabled");
    });
  
    it("checks for true conditions", () => {
      cy.get(".sc-bcXHqe").click();
      cy.get("#name-input")
        .type("İstanbul")
        .should("have.value", "İstanbul");
  
      cy.get("#size-dropdown")
        .select("Large")
        .should("have.value", "Large");
  
      
  
      cy.get("#special-text")
        .type("dadadad")
        .should("have.value", "dadadad");

    });
  });