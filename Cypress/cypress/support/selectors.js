export default {
   /**
    * selectors for login page
    * @example selector.username
    */
   username: "#login__username",
   password: "#login__password",
   loginBtn: ".btn-login",

   /**
    * selectors for sidebar menu
    * @example selector.user_name
    */
   user_name: '.user-name > p',
   missionCoontrolName: '.dash-main',

    /**
    * selectors for import page
    * 
    * It's best to use xpath() on this page than
    * get() because selectors don't have specific attributes
    * @example selector.inputFile
    */
    inputFile: '#file',
    firstMappingSelector: '//tr[1]/td[2]/select[@class="form-control"]',
    secondMappingSelector: '//tr[2]/td[2]/select[@class="form-control"]',
    importBtn: '//div[13]/div/section/div[1]/div[5]/div/div[3]/div/div/div/a',

    /**
     * selectores for custmomer page
     * @example cy.birthDayDate
     */
    birthDayDate: '.personal-details > div > div > p',
}