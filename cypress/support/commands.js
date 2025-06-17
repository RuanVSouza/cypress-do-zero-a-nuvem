Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Ruan')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ruan@testes.com')
    cy.get('#phone').type('11999999999')
    cy.get('#open-text-area').type('Obrigado pela atenção')
    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

    cy.get('.success')
        .should('be.visible')
        .contains('Mensagem enviada com sucesso.')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit12', (data) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.phone)
    cy.get('#open-text-area').type(data.message, { delay: 0 })
    cy.contains('button', 'Enviar').click()
        .should('be.visible')
        .click()

    cy.get('.success')
        .should('be.visible')
        .contains('Mensagem enviada com sucesso.')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit1234', (firstName, lastName, email, phone, message) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#open-text-area').type(message, { delay: 0 })
    cy.contains('button', 'Enviar').click()
        .should('be.visible')
        .click()

    cy.get('.success')
        .should('be.visible')
        .contains('Mensagem enviada com sucesso.')
})