import { Page } from '@playwright/test';
import { clickIfVisible } from '../utils/helpers';
import { navigateAndHandle } from '../utils/helpers';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
    private searchInput = '#searchKeyWords2';
    private searchButton = '#searchButton';

async searchForProduct(product: string) {
    await this.fillElement(this.searchInput, product)
    await this.clickElement(this.searchButton)
    await this.hoverElement(this.searchButton)

    }

    
    
}
