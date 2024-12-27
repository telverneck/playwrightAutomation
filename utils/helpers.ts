import { Page } from '@playwright/test';

const acceptButton = '#onetrust-accept-btn-handler';

/**
 * Keeps checkig if the element is visible and clicks on it.
 * 
 * @param {string} selector - The selector of the button to type.
 * @param {string} page - Class of the page
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
export async function clickIfVisible(page: Page, selector: string): Promise<void> {
    try {
    if (await page.isVisible(selector)) {
        await page.click(selector);
        console.log(`Clicked on visible element: ${selector}`);
    } else {
        console.log(`Element not visible: ${selector}`);
    }
    } catch (error) {
    console.error(`Error while checking or clicking element: ${selector}`, error);
    }


}

export async function navigateAndHandle(page: Page, url: string) {
    await page.goto(url);
    await checkCookies(page)
}
export async function checkCookies(page: Page) {
    await clickIfVisible(page, acceptButton); // Check for the element after navigation
}
