import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { navigateAndHandle } from '../utils/helpers';

export class LoginPage extends BasePage {
    private usernameSelector = '#username';
    private passwordSelector = '#password';
    private signInButton = '#signInButton';
    private loginPageURL = '/shop/signin/display.action';
    private textToValidate = 'text=Account Summary' 
    private sendCodeButton = '#send-code-button' 
    private menuButton = '#guiHeader .gui-my-account-selector.gui-dropdown'
    private logoutButton = '.gui-header-top-links .btn-signout'
    private yopmailConsentButton = "button[aria-label='Consent']" 
    private yopmailCodeText = "h2[style='margin: 0']" 
    private yopmailGoButton = "#refreshbut button" 
    private errorMessage = ".alert__text_error" 




async navigateToLogin() {
    await navigateAndHandle(this.page,this.loginPageURL) 
    }

async logout() {
    await this.clickElement(this.menuButton);
    await this.clickElement(this.logoutButton)
    }

async login(username: string, password: string) {
    await this.fillElement(this.usernameSelector, username);
    await this.fillElement(this.passwordSelector, password);
    await this.clickElement(this.signInButton);
    await this.retrieveOneTimeCode();
    await this.page.screenshot({ path: 'screenshot.png' });

    }

async checkLoginPage() {
    return await this.page.isVisible(this.textToValidate); 
    }

async checkErrorMessage() {
    return await this.page.isVisible(this.errorMessage); 
    }

    async retrieveOneTimeCode() {
        const confirmTextLocator = this.page.locator(this.sendCodeButton);
    
        if (await confirmTextLocator.isVisible()) {
            console.log('Text "Confirm it\'s you" is present on the page.');
            await this.clickElement(this.sendCodeButton);
    
            // Open a new tab
            const context = this.page.context(); // Get the browser context
            const newTab = await context.newPage(); // Open a new tab
    
            // Perform actions in the new tab
            await newTab.goto('https://yopmail.com/');
            await newTab.click(this.yopmailConsentButton);
            await newTab.getByPlaceholder('Enter your inbox here').fill('test.cocus.telmo@yopmail.com');
            await newTab.click(this.yopmailGoButton);
    
            // Access the iframe in the new tab
            const iframe = newTab.frameLocator('#ifmail');
            const textFromIframe = await iframe.locator(this.yopmailCodeText).textContent();
            const retrievedText = textFromIframe?.trim(); // Trim to remove unnecessary whitespace
            console.log(`Retrieved text: ${retrievedText}`);
    
            // Close the new tab
            await newTab.close();
    
            // Switch back to the original tab
            await this.page.bringToFront();
    
            // Perform actions in the original tab
            await this.page.getByLabel('Security code This code').fill(retrievedText);
            await this.page.getByRole('button', { name: 'Continue' }).click();
        }
    }
    
}
