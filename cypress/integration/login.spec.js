describe('My website', () => {
    it('Changes from start screen to login with credentials page', () => {
        cy.visit('http://localhost:3000');
        cy.get('[data-testid="gotoLogin"]').click()
        cy.url().should('include', '/inicio/credenciales')
    })

}) 

describe('ASD', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/inicio/credenciales');
        cy.get('[data-testid="employeeNumberInput"]').as('numberInput')
        cy.get('[data-testid="dependencyInput"]').as('dependencyInput')
        cy.get('[data-testid="credentialsSubmitButton"]').as('credentialsSubmitBtn')
    })

    it('Logins with user credentials',  function() {
        const employeeNumber = '1234'
        const dependency = '12' 

        cy.get('@numberInput').next().should('be.empty')
        cy.get('@dependencyInput').next().should('be.empty')

        cy.get('@credentialsSubmitBtn').click()
        cy.get('@numberInput').next().should('not.be.empty')
        cy.get('@dependencyInput').next().should('not.be.empty')


        cy.get('@numberInput').type(employeeNumber)
        cy.get('@dependencyInput').type(dependency)
        cy.get('@numberInput').next().should('be.empty')
        cy.get('@dependencyInput').next().should('be.empty')

        cy.get('@credentialsSubmitBtn').click()
        cy.get('@credentialsSubmitBtn').contains('Accediendo...')
        cy.get('@credentialsSubmitBtn').should('be.disabled')
        cy.url().should('include', '/inicio/fotos')

        cy.get('[data-testid="openModalToTakePhoto"]').click()
        cy.get('video')
        cy.get('[data-testid="takePhotoBtn"]').click()

    })
})