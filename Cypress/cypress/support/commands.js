import 'cypress-file-upload';

Cypress.Commands.add('loginToMissionControl', () => {
    cy.visit(Cypress.config().baseUrl + "login");
    cy.get('#login__username').type(Cypress.config().login);
    cy.get('#login__password').type(Cypress.config().pass);
    cy.get('.btn-login').click();
    cy.wait(30000);
    cy.get('.user-name > p').should('include.text', 'Kamil');
})

Cypress.Commands.add('importUsers', (fileName, filePath) => {
    cy.readFile(filePath).then(function (fileContent) {

        cy.get('#file').attachFile({ fileContent, fileName, mimeType: 'application/csv' })
    
        cy.xpath('//tr[1]/td[2]/select[@class="form-control"]').select('EMAIL');
        cy.on('uncaught:exception', (err, runnable) => {
            expect(err.message).to.include('The following error originated from your application code, not from Cypress')
            done()
            return false
          });
        cy.xpath('//tr[2]/td[2]/select[@class="form-control"]').select('BIRTH_DATE (YYYY-MM-DD)');
        cy.xpath('//div[13]/div/section/div[1]/div[5]/div/div[3]/div/div/div/a').click();
        cy.get('h3').should('contain', 'Your file is being processed. We will inform you by email when it is completed');
        cy.wait(5000);
    })
})
