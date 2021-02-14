import selector from '../../support/selectors';

describe('Login', () => {
    beforeEach(() => {
        cy.loginToMissionControl();
      })

    it('Upload users data ', () => {
        const fileName = Cypress.config().csvFileName;

        cy.visit(Cypress.config().baseUrl + "settings/import");
        cy.importUsersWithTwoColumn(fileName);
        
        cy.screenshot('import successful');
    }) 

    it('User have a birth date', () => {
        const user = 'edrone1%40test.pl';
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.waitForLoadingSpinnerNotDisplay();

        cy.get(selector.birthDayDate).should('contain', '2020-4-4');
        cy.screenshot('user contain date');
    }) 

    it('User do not have a birth date', () => {
        const user = 'edrone2%40test.pl';
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.waitForLoadingSpinnerNotDisplay();

        cy.get(selector.birthDayDate).should('not.contain', '1986');
        cy.screenshot('user not contain date');
    }) 

    it('Update user to add birth date', () => {
        const fileName = Cypress.config().csvUpdateFileName;
        const user = 'edrone3%40test.pl';

        cy.visit(Cypress.config().baseUrl + "settings/import");
        cy.importUsersWithTwoColumn(fileName);
        cy.visit(Cypress.config().baseUrl + 'customer/single?email=' + user);
        cy.waitForLoadingSpinnerNotDisplay();

        cy.get(selector.birthDayDate).should('contain', '1986-2-1');
        cy.screenshot('user contain date');
    }) 
})