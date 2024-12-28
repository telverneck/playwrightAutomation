import { Page } from '@playwright/test';
import { clickIfVisible } from '../utils/helpers';
import { navigateAndHandle } from '../utils/helpers';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
    private searchInput = '#searchKeyWords2';
    private searchButton = '#searchButton';
    private menuLabel = "//li[@class='gui-sub-nav']";
    private menuOptionLabel = "//div[@class='gui-sub-nav-content']";

async searchForProduct(product: string) {
    await this.fillElement(this.searchInput, product)
    await this.clickElement(this.searchButton)
    await this.hoverElement(this.searchButton)

    }
    
async goToMenu(menu: string, suboption: string) {
    const locator = `${this.menuLabel}//a[text()='${menu}']`;
    const option = `(${this.menuOptionLabel}//a[text()='${suboption}'])[1]`
    try {
        const element = this.page.locator(locator);
        await element.hover();
        await this.clickElement(option);
    } catch (error) {
        console.error(`Error hovering over element with text: ${menu} and ${suboption}`, error);
    }
}

    
    
}
