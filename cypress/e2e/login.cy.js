describe('Realizar login com diferentes usuários', () => {

  beforeEach('Acessar a página de login', () => {
    cy.visit('https://www.saucedemo.com/v1')
    cy.title().should('eq', 'Swag Labs')
  })

  it('Login com usuário padrão e senha em branco', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#login-button').click()
    let error = 'Password is required'
    cy.contains('h3', error).should('be.visible')
  })

  it('Login com usuário sem cadastro e senha aleatória', () => {
    cy.get('#user-name').type('random_user')
    cy.get('#password').type('random_password')
    cy.get('#login-button').click()
    let error = 'Username and password do not match any user in this service'
    cy.contains('h3', error).should('be.visible')
  })

  it('Login com usuário padrão e senha válida', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.contains('div', 'Products').should('be.visible')
  })

  it('Login com usuário padrão e senha inválida', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce2')
    cy.get('#login-button').click()
    let error = 'Username and password do not match any user in this service'
    cy.contains('h3', error).should('be.visible')
  })

  it('Login com usuário bloqueado e senha válida', () => {
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    let error = 'Sorry, this user has been locked out.'
    cy.contains('h3', error).should('be.visible')
  })
})