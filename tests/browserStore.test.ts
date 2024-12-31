import { test as baseTest } from '@playwright/test';
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


test.beforeEach(async ({ page, homePage   }) => {
    await homePage.navigateToHome();
    await checkCookies(page)


});

test('Browser Store using given name options - New In', async ({ homePage, navigationPage }) => {
    
    // await homePage.navigateToHome();
    await navigationPage.goToMenu("New In", "Shop All")

});

test('Browser Store using given name options - Shoes', async ({ homePage, navigationPage }) => {
    // await homePage.navigateToHome();
    await navigationPage.goToMenu("Shoes", "Boots")

});

test('Browser Store using given name options - Outlet', async ({ homePage, navigationPage }) => {
    // await homePage.navigateToHome();
    await navigationPage.goToMenu("Outlet", "Outlet Toys")

});


