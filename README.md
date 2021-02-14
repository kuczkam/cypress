###### example of automate tests in Cypress based on controle.edrone.me

**After clone run in console:**
> npm install

**To open cypress go to Cypress folder in console and run:**
> npx cypress open

or you can run test straight from:
> npx cypress run

## Useful information

In the `Cypress/cypress/support/commands.js` you can find custom commends for all pages and custom waits.<br />
In the `Cypress/cypress/support/selectors.js` you can find selectors for all pages.<br />
In the `Cypress/cypress/support/messages.js` you can find messages displayed on Mission Control.<br />

## Screenshots

Screenshots are store in the `Cypress/cypress/report/html/res/screenshots` folder with the name of the test

## Username and Password

Before run tests you have to add username and password in `Cypress/cypress.json`:
> "login": "",<br />
> "pass": "",

