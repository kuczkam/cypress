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
    cy.waitForTextExistsInBody('MISSION CONTROL');
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

/**
 * custom waits commends to use in mission control
 * @example waitForTextExistsInBody('test');
 */
Cypress.Commands.add('waitForTextExistsInBody', (expectedText) => {
    cy.get('body').then(($missionCoontrolName) => {
        if ($missionCoontrolName.text().includes(expectedText)) {
            return cy.log('the given text was found in the body')
        } else {
            cy.wait(200);
            cy.waitForTextEcistInBody()
        }
    })
})

Cypress.Commands.add('waitForLoadingSpinnerNotDisplay', () => {
    cy.get(selector.loading).then(($loading) => {
        if ($loading.css("display") === 'none') {
            return cy.log('spinner not display')
        } else {
            cy.wait(200);
            cy.waitForLoadingSpinnerNotDisplay()
        }
    })
})