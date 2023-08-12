describe('Realizar compras de produtos', () => {

    const produtos = ['Sauce Labs Backpack', 'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie'
    ]

    beforeEach('Realizar login com usuário padrão', () => {
        cy.visit('https://www.saucedemo.com/v1')
        cy.title().should('eq', 'Swag Labs')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.contains('div', 'Products').should('be.visible')
    })

    it('Adicionar todos os produtos ao carrinho e finalizar a compra', () => {
        produtos.forEach((produto) => {
            cy.contains('.inventory_item_name', produto).click()
            cy.contains('.btn_primary', 'ADD TO CART').click()
            cy.get('.bm-burger-button > button').click()
            cy.get('#inventory_sidebar_link').click()
        })
        cy.get('.shopping_cart_badge').should('contain', '5').click()
        cy.contains('.checkout_button', 'CHECKOUT').click()
        cy.get('#first-name').type('Nicolas')
        cy.get('#last-name').type('Saraiva')
        cy.get('#postal-code').type('6221000')
        cy.contains('.cart_button', 'CONTINUE').click()
        cy.contains('div', 'Checkout: Overview').should('be.visible')
        cy.contains('.cart_button', 'FINISH').click()
        cy.contains('.complete-header', 'THANK YOU FOR YOUR ORDER').should('be.visible')
    })
})