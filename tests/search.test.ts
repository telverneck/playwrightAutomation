import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { NavigationPage } from '../pages/NavigationPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { clickIfVisible , checkCookies} from '../utils/helpers';
// import { test as baseTest } from '@playwright/test';

const testdata= JSON.parse(JSON.stringify(require("../testData.json")))

// Set pages as public to instantiate only once
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

test('Search for valid product and add in the basket', async ({ homePage, navigationPage, searchResultsPage }) => {
    
    // await homePage.navigateToHome();
    await navigationPage.searchForProduct("shirt")
    await searchResultsPage.checkForProductResults()
    await searchResultsPage.clickFirstResult()
    await searchResultsPage.addToBasket()


});

test('Negative Test - Search for invalid product ', async ({ homePage, navigationPage, searchResultsPage }) => {
    // await homePage.navigateToHome();
    await navigationPage.searchForProduct("noresults")
    await searchResultsPage.checkForNoResults()


});


