import { Page } from '@playwright/test';
import { clickIfVisible } from '../utils/helpers';
import { navigateAndHandle } from '../utils/helpers';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private homePageContainer = '#Page_Container';

async navigateToHome() {
    await navigateAndHandle(this.page,'/') 
    // await this.page.goto('/'); 
    // await clickIfVisible(this.page, '#onetrust-accept-btn-handler');
    }

async checkHomePage() {
    return await this.page.isVisible(this.homePageContainer); 
    }


    
    
}
