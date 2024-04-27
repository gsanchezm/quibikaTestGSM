const { expect } = require('@playwright/test');
const BasePage = require('./BasePage')

class LoginPage extends BasePage{
    constructor(page) {
        super(page)
        this.usernameField  = page.getByPlaceholder('Usuario o correo electrónico');
        this.passwordField  = page.getByPlaceholder('Contraseña');
        this.rememberMeCheck = page.locator('span', {hasText: 'Recordarme'});
        this.autenticateButton = page.getByRole('button', {name: 'Autenticar'});
      }


      async loginAs(username) {
        await this.usernameField.fill(username);
        return this; 
        }

        async withPassword(password) {
            await this.passwordField.fill(password);
            return this;  
        }

        async andRememberMe() {
            await this.rememberMeCheck.click();
            return this;  
        }

        async login() {
            await this.autenticateButton.click();
            return this;  
        }

        async verifyWebElementsAreDisplayed() {
            const elements = [
                { element: this.usernameField, name: 'Username Field' },
                { element: this.passwordField, name: 'Password Field' },
                { element: this.rememberMeCheck, name: 'Remember Me Checkbox' },
                { element: this.autenticateButton, name: 'Authenticate Button' }
            ];
    
            for (const { element, name } of elements) {
                await expect(element, `${name} should be visible`).toBeVisible({
                    timeout: 5000 
                });
            }
            return this;  
        }
}

module.exports = LoginPage;