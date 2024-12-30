import { Page, expect, Locator } from '@playwright/test';
import { clickIfVisible } from '../utils/helpers';
import { navigateAndHandle } from '../utils/helpers';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
    private productList = '.product__items.js-product-list-items';
    private firstItem = '.product__item:nth-child(1)';
    private productDetail = '#productTitle'; 
    private sizeSelector = 'select[id*=optionSize]'; 
    private addToBagButton = '.btn-add-to-bag'; 
    private continueToCheckoutButton = "//a[contains(text(),'Continue to Checkout')]"
    private checkoutPageTitleLabel = "#checkoutPageTitleBar"
    private homeButton = "a[title='Home']"






async checkForProductResults() {
    await this.isElementVisible(this.productList)
    }
async checkForNoResults() {
    await this.isElementNotVisible(this.productList)
    }

async clickFirstResult(){
    await this.hoverElement(this.homeButton)
    await this.clickElement(this.firstItem)


    
}

/**
     * Adds the product to the basket and continue to the checkout page.
     * 
     * This function will also include a random option.
     * Unfortunetely a hoverElement() is necessary due this doesn't work well on webkit.
     * Will also perform an assertion based on the checkoutPageTitle
     * @param {string} selector - The CSS selector of the button to click.
     */
async addToBasket(){
    await this.isElementVisible(this.productDetail)
    await this.selectRandomOption(this.sizeSelector)
    await this.hoverElement(this.productDetail)
    await this.clickElement(this.addToBagButton)
    await this.clickElement(this.continueToCheckoutButton)
    await this.isElementVisible(this.checkoutPageTitleLabel)

}

/**
     * Select a random available Option on the page using the provided selector.
     * 
     * This function finds the option element by the given selector and performs a random select on it.
     * If the element can't be selected, it logs an error message.
     *
     * @param {string} selector - The CSS selector of the button to click.
     * @throws {Error} If the element is not found or cannot be clicked.
     */
async selectRandomOption(locator){
    
    const dropdown = this.page.locator(locator);

    const options: Locator[] = await dropdown.locator('option').all();

    // Filter out options containing 'No Longer Available'
    const validOptions: Locator[] = [];
    for (const option of options) {
        const optionText = await option.innerText();
        if (!optionText.includes('No Longer Available')) {
        validOptions.push(option);
        }
    }

    // Ensure there are valid options to choose from
    if (validOptions.length === 0) {
        throw new Error('No valid options available in the dropdown.');
    }

    // Generate a random index from valid options
    const randomIndex = Math.floor(Math.random() * validOptions.length);

    // Get the value of the randomly selected valid option
    const randomValue = await validOptions[randomIndex].getAttribute('value');

    // Select the random valid option
    await dropdown.selectOption(randomValue);

    // Optionally, assert that the selected option is as expected
    const selectedValue = await dropdown.inputValue();
    expect(selectedValue).toBe(randomValue);

    
}
    
    
}
