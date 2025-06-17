describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Ruan')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ruan@testes.com')
    cy.get('#phone').type('11999999999')
    cy.get('#open-text-area').type('Obrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atençãoObrigado pela atenção', { delay: 0 })
    cy.get('button[type="submit"]')
      .should('be.visible')
      .click()

    cy.get('.success')
      .should('be.visible')
      .contains('Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Ruan')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ruanteste,com')
    cy.get('#phone').type('11999999999')
    cy.get('#open-text-area').type('Obrigado pela atenção', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .contains('Valide os campos obrigatórios!')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Ruan')
    cy.get('#lastName').type('Souza')
    cy.get('#email').type('ruan@testes.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Obrigado pela atenção', { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .contains('Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Ruan')
      .should('have.value', 'Ruan')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Souza')
      .should('have.value', 'Souza')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('ruan@testes.com')
      .should('have.value', 'ruan@testes.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('11999999999')
      .should('have.value', '11999999999')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error')
      .should('be.visible')
      .contains('Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado mockados', () => {
    const data = {
      firstName: 'Ruan',
      lastName: 'Souza',
      email: 'ruan@testes.com',
      phone: '11999999999',
      message: 'Teste de mensagem'
    }

    cy.fillMandatoryFieldsAndSubmit()
    cy.fillMandatoryFieldsAndSubmit12(data)
    cy.fillMandatoryFieldsAndSubmit1234("Ruan", "Souza", "ruan@testes.com", "11999999999", "Teste de mensagem")
  })

  it('Utilizando Cy.contains', () => {
    cy.fillMandatoryFieldsAndSubmit()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })


  it('seleciona um produto(Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="ajuda"]')
      .check()
      .should('have.value', 'ajuda')
      .should('be.checked')

    cy.get('input[type="radio"][value="feedback"]')
      .should('not.be.checked')
  })

  it('marca o tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })


  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json')
      .should(fileInput => {
        expect(fileInput[0].files[0].name).to.equal('example.json')
      })
  })


  it('seleciona um arquivo simulando um drag - and -drop', () => {
    cy.get('input[type="file"]')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(fileInput => {
        expect(fileInput[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(fileInput => {
        expect(fileInput[0].files[0].name).to.equal('example.json')
      })
  })



  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('a[href="privacy.html"]')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })



  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })



})

