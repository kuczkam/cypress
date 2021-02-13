import selector from './selectors';
import message from './messages';
import 'cypress-file-upload';


/**
 * custom commends to used in login page
 * @example cy.loginToMissionControl()
 */
Cypress.Commands.add('loginToMissionControl', () => {
    cy.visit(Cypress.config().baseUrl + "login");
    cy.get(selector.username).type(Cypress.config().login);
    cy.get(selector.password).type(Cypress.config().pass);
    cy.get(selector.loginBtn).click();
    cy.waitForMissionControlOpen();
})

Cypress.Commands.add('waitForMissionControlOpen', () => {
    cy.get('body').then(($missionCoontrolName) => {
        if ($missionCoontrolName.text().includes('MISSION CONTROL')) {
            return cy.log('user has logged in successfully')
        } else {
            cy.wait(200);
            cy.waitForMissionControlOpen()
        }
    })
})

/**
 * custom commends to used in import page
 * @example cy.importUsers()
 */
Cypress.Commands.add('importUsersWithTwoColumn', (fileName) => {
    cy.fixture(fileName).then(function (fileContent) {

        cy.get(selector.inputFile).attachFile({ fileContent, fileName, mimeType: 'application/csv' })
    
        cy.xpath(selector.firstMappingSelector).select('EMAIL');
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include(message.errorMsg)
            done()
            return false
          });
        cy.xpath(selector.secondMappingSelector).select('BIRTH_DATE (YYYY-MM-DD)');
        cy.xpath(selector.importBtn).click();
        cy.get('h3').should('contain', message.fileIsBeingProcessed);
    })
})
