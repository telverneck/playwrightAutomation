import { clickIfVisible } from '../utils/helpers';
import { expect,Page } from '@playwright/test';

export class BasePage {
    constructor(protected page: Page) {}

async handleGlobalElements() {
    await clickIfVisible(this.page, '#onetrust-accept-btn-handler');
    }

/**
 * Clicks on the provided selector.
 * 
 * This function finds the element by the given selector and performs a click action on it.
 *
 * @param {string} selector - The selector of the button to click.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
    }

/**
 * Hover ther cursor on the provided selector.
 * 
 * This function finds the element by the given selector and performs a hover action on it.
 *
 * @param {string} selector - The selector of the button to hover.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async hoverElement(selector: string): Promise<void> {
    await this.page.locator(selector).hover();
    }

/**
 * Clicks on the provided selector.
 * 
 * This function finds the element by the given selector and performs a click action on it.
 *
 * @param {string} selector - The selector of the button to click.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async clickJavascript(selector: string){
    await this.page.evaluate((selector) => {
        const element = document.querySelector(selector);
        if (element instanceof HTMLElement) {
          element.click(); // Safely use click()
        } else {
            console.error('Element is not an HTMLElement or not found!');
        }
    }, selector);
}

/**
 * Types into the field of the provided selector.
 * 
 * This function finds the element by the given selector and performs type on it.
 *
 * @param {string} selector - The selector of the button to type.
 * @param {string} text - text to be add in the field
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async fillElement(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
    }

/**
 * Check if the element is present on the page by using the provided selector.
 * 
 * @param {string} selector - The selector of the button to type.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async isElementVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveCount(1);
    }

/**
 * Check if the element is NOT present on the page by using the provided selector.
 * 
 * @param {string} selector - The selector to be checked.
 * @returns {Promise<void>} A promise that resolves when the click action is completed.
 */
async isElementNotVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toHaveCount(0);
    }
}
