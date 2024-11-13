describe("template spec", { testIsolation: false }, () => {
  it("visitar la pagina", () => {
    cy.visit("https://automationintesting.online/");
  });

  it("verificar informacion del hotel", () => {
    //tomamos cada span,verificamos que contenga el texto indicado y verificamos si existe
    cy.get(".contact > :nth-child(3) > :nth-child(1)")
      .contains("Shady Meadows B&B")
      .should("exist");

    cy.get(".contact > :nth-child(3) > :nth-child(2)")
      .contains("The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S")
      .should("exist");

    cy.get(".contact > :nth-child(3) > :nth-child(3)")
      .contains("012345678901")
      .should("exist");

    cy.get(".contact > :nth-child(3) > :nth-child(4)")
      .contains("fake@fakeemail.com")
      .should("exist");
  });

  it("validar imagen visible", () => {
    //tomamos las imagenes y verificamos si estan visibles
    cy.get('img[src="/images/rbp-logo.jpg"]').should("be.visible");
    cy.get('img[src="/images/room2.jpg"]').should("be.visible");
  });

  it("validar descripcion", () => {
    //validamos que exista la descripcion en el sitio
    cy.get(".col-sm-10 > p")
      .contains(
        "Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place."
      )
      .should("exist");
  });

  it("enviar el formulario de contacto", () => {
    //primero verificamos que se debe colocar en cada campo enviando el form vacio,rellenamos el formulario y verificamos que se envie correctamente
    cy.get("#submitContact").click();
    cy.get('.alert').should('be.visible')

    cy.get("#name").type("Juan Perez");
    cy.get("#email").type("noelia@gmail.com");
    cy.get("#phone").type("1234567891011");
    cy.get("#subject").type("Prueba");
    cy.get("#description").type("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.");
    cy.get("#submitContact").click();
  });


it("enviar formulario de contacto vacio", () => {
  //enviamos con campos vacios y verificamos que las alertas se muestren
  cy.visit("https://automationintesting.online/");
  cy.get("#submitContact").click();
  cy.get('p').contains('Subject must be between 5 and 100 characters.')
  cy.get('p').contains('Message may not be blank')
  cy.get('p').contains('Phone may not be blank')
  cy.get('p').contains('Subject may not be blank')
  cy.get('p').contains('Name may not be blank')
  cy.get('p').contains('Message must be between 20 and 2000 characters.')
  cy.get('p').contains('Email may not be blank')
  cy.get('p').contains('Phone may not be blank')

})

it('verificar el formulario reservas',()=>{
  //verificamos formulario reservas (no se encontraron los dos errores que tira el alert)
  cy.visit("https://automationintesting.online/");
  cy.get('.col-sm-7 > .btn').click()
  cy.get('input[name="firstname"]').should('be.visible').type('Noelia')
  cy.get('input[name="lastname"]').should('be.visible').type('Cabral')
  cy.get('input[name="email"]').should('be.visible').type('noelia@gmail.com');
  cy.get('input[name="phone"]').should('be.visible').type('123456789');
  cy.get(':nth-child(4) > .rbc-row-content > :nth-child(1) > :nth-child(4) > .rbc-button-link').click()
  cy.get('.col-sm-4 > .btn-outline-primary').click()
})


it('Cambiar el mes en el calendario', () => {
  //hacemos clic en los botons de mes y verificamos que avancen/retrocedan nuevamente
  cy.visit("https://automationintesting.online/");
  cy.get('.col-sm-7 > .btn').click()

  cy.get('.rbc-toolbar > :nth-child(1) > :nth-child(3)').contains('Next').click();
  cy.get('.rbc-toolbar-label').should('not.contain', 'November 2024');
  cy.get('button').contains('Back').click();
  cy.get('.rbc-toolbar-label').should('contain', 'November 2024');
});

});