describe('Login', () => {
    beforeEach(() => {
        cy.loginToMissionControl();
      })

    it('Upload users data ', () => {
        const fileName = Cypress.config().csvFileName;

        cy.visit(Cypress.config().baseUrl + "settings/import");
        cy.importUsers(fileName, Cypress.config().csvFilePath + fileName);
    }) 

    it('User have a birth date', () => {
        const user = 'edrone1%40test.pl';
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.get('.personal-details > div > div > p').should('contain', '2020-4-4');
    }) 

    it('User do not have a birth date', () => {
        const user = 'edrone2%40test.pl';
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.get('.personal-details > div > div > p').should('not.contain', '1986');
    }) 

    it('Update user to add birth date', () => {
        const fileName = Cypress.config().csvUpdateFileName;
        const user = 'edrone3%40test.pl';

        cy.visit(Cypress.config().baseUrl + "settings/import");
        cy.importUsers(fileName, Cypress.config().csvFilePath + fileName);
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.get('.personal-details > div > div > p').should('contain', '1986-2-1');
    }) 
})
