import { expect, test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { clickIfVisible , checkCookies} from '../utils/helpers';
// import { test as baseTest } from '@playwright/test';

const testdata= JSON.parse(JSON.stringify(require("../testData.json")))

const test = baseTest.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
    navigationPage: NavigationPage;
    searchResultsPage: SearchResultsPage;
    }>({
        loginPage: async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage);
        },
        homePage: async ({ page }, use) => {
            const homePage = new HomePage(page);
            await use(homePage);
        },
        navigationPage: async ({ page }, use) => {
            const navigationPage = new NavigationPage(page);
            await use(navigationPage);
            },
        searchResultsPage: async ({ page }, use) => {
            const searchResultsPage = new SearchResultsPage(page);
            await use(searchResultsPage);
            },
    });
    
    export { test };


test.beforeEach(async ({ page, homePage,  loginPage  }) => {
    await checkCookies(page)
    await homePage.navigateToHome();
    await loginPage.navigateToLogin();
});

// test.afterEach(async ({ page, loginPage   }) => {
//     await loginPage.logout();
// });

test('User can login/logout successfully with a previsouly registered account ', async ({ loginPage, homePage, navigationPage, searchResultsPage  }) => {
    
    // await homePage.navigateToHome();
    await loginPage.navigateToLogin();
    await loginPage.login(testdata.login, testdata.password);
    await loginPage.logout();

    const success = await homePage.checkHomePage();
    expect(success).toBe(true);
});

test('Invalid login attempt', async ({ loginPage, homePage }) => {
    
    // await homePage.navigateToHome();
    // await loginPage.navigateToLogin();
    await loginPage.login(testdata.wrongLogin, testdata.password2);
    await loginPage.checkErrorMessage();

});




