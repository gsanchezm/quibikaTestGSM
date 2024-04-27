const { expect } = require('@playwright/test');
const BasePage = require('./BasePage');

class MenuBarPage extends BasePage{
    constructor(page) {
        super(page)
        this.dashboardLink = page.locator('[href*="#/dashboard"]:nth-child(1) > i');
        this.contributionsLink = page.locator('[href*="#/contributions"]');
        this.categoryTypesLink = page.locator('(//*[contains(text(),"Categor")])[1]');
        this.suggestedContributionsLink = page.locator('[href*="#/contribution-suggested"]');
        this.membersLink = page.locator('[href*="#/members"]');
        this.partnersLink = page.locator('[href*="#/partners"]');
        this.reportLink = page.locator('[href*="#/reports"]');
        this.logoutButton = page.locator('#sidenav-collapse-main').getByText('Salir')//'(//*[contains(text(),"Salir")])[2]');
      }

      async goToDashboardPage() {
        await this.dashboardLink.click();
        return this; 
      }

        async goToContributionsPage() {
            await this.contributionsLink.click();
            return this;  
        }

        async goToCategoryTypesPage() {
            await this.categoryTypesLink.click();
            return this; 
        }

        async goToSuggestedContributionsPage() {
            await this.suggestedContributionsLink.click();
            return this;  
        }

        async goToMembersPage() {
            await this.membersLink.click();
            return this;  
        }

        async goToPartnersPage() {
            await this.partnersLink.click();
            return this;  
        }

        async goToReportPage() {
            await this.reportLink.click();
            return this;  
        }

        async andLogOut() {
            await this.logoutButton.dispatchEvent('click');
            return this;  
        }

        async checkIfLogOutIsVisible(){
            await expect(this.logoutButton).toBeVisible(({
                timeout: 15000 
            }));
        }

        async verifyMenuLinksAreVisible() {
            const elements = [
                { locator: this.dashboardLink, name: 'Dashboard Menu' },
                { locator: this.contributionsLink, name: 'Contributions Menu' },
                { locator: this.categoryTypesLink, name: 'Category Types Menu' },
                { locator: this.suggestedContributionsLink, name: 'Suggested Contributions Menu' },
                { locator: this.membersLink, name: 'Members Menu' },
                { locator: this.partnersLink, name: 'Partners Menu' },
                { locator: this.reportLink, name: 'Report Menu' },
                { locator: this.logoutButton, name: 'LogOut Link' }
            ];
    
            for (const { locator, name } of elements) {
                await expect(locator, `${name} should be visible`).toBeVisible();
            }
            return this;
        }
}

module.exports = MenuBarPage;
