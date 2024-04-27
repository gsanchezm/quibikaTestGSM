const { test } = require('@playwright/test');
const { expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage.js');
const MenuBarPage = require('../pages/MenuBarPage.js');
const CategoryTypesPage = require('../pages/CategoryTypesPage.js');
const LoggerDecorator = require('../decorators/LoggerDecorator.js');
const HttpService = require('../utils/HttpService.js');

test.describe('Excercise 02 Test', () => {
    let page;
    let loginPage;
    let menuBarPage;
    let categoryTypesPage;
    let userData;
    let newUser;

    test.beforeAll(async ({ browser }) => {
        const httpService = new HttpService('https://api.club-administration.qa.qubika.com/');
        const user = `gilsanchez${Math.random()}@test.com`
        newUser = {
            email: user,
            password: "123456",
            roles: ["ROLE_ADMIN"]
        };
        
        const response = await httpService.post('/api/auth/register', newUser);
        userData = response.data;
        expect(response.status).toBe(201);

        // Start a new browser context and page that will persist across tests
        const context = await browser.newContext();
        page = await context.newPage();

        // Create instances of page objects and then decorate them
        loginPage = new LoginPage(page);
        menuBarPage = new MenuBarPage(page);
        categoryTypesPage = new CategoryTypesPage(page);

        // Apply decorator
        loginPage = LoggerDecorator(loginPage);
        menuBarPage = LoggerDecorator(menuBarPage);
        categoryTypesPage = LoggerDecorator(categoryTypesPage);
    });

    test.beforeEach(async () =>{
        // Navigate to the initial page (login page) and log in
        await loginPage.navigate('/#/auth/login')
                                .then(() => loginPage.loginAs(userData.email))
                                .then(() => loginPage.withPassword(newUser.password))
                                .then(() => loginPage.andRememberMe())
                                .then(() => loginPage.login());
    })


    test('Verify the login page is displayed correctly', async () => {
        await menuBarPage.checkIfLogOutIsVisible();
        await menuBarPage.andLogOut();
        await loginPage.verifyWebElementsAreDisplayed();
    });

    test('Validate that the user is logged in', async () => {
        await menuBarPage.verifyMenuLinksAreVisible();
    });

    test('Create a new category', async () => {
        await menuBarPage.goToCategoryTypesPage();
        await categoryTypesPage.andAdd()
                                .then(() => categoryTypesPage.categoryNameAs('Test001'))
                                .then(() => categoryTypesPage.andAccept())
                                .then(() => categoryTypesPage.navigateToPage());
        await categoryTypesPage.verifyValuesInTable(['Test001'])
    });

    test('Create a new sub-category', async () => {
        await menuBarPage.goToCategoryTypesPage();
        await categoryTypesPage.andAdd()
                                .then(() => categoryTypesPage.categoryNameAs('Test001'))
                                .then(() => categoryTypesPage.isSubcategoryFrom('Test Futbol'))
                                .then(() => categoryTypesPage.andAccept())
                                .then(() => categoryTypesPage.navigateToPage());
        await categoryTypesPage.verifyValuesInTable(['Test001', 'Test Futbol'])
    });


    test.afterAll(async () => {
        // Cleanup: close the browser context
        await page.context().close();
    });
});