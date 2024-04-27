const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
        this.addButton = page.getByRole('button', {hastext: ' Adicionar'});
        this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
        this.acceptButton = page.getByRole('button', { name: 'Aceptar' });
        this.paginationLink = page.locator('.pagination');
        this.generalTable = page.locator('.table');
    }

    async pressKey(key){
        this.page.keyboard.press(key)
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async andAdd() {
        await this.addButton.click();
    }

    async andCancel() {
        await this.cancelButton.click();
    }

    async andAccept() {
        await this.acceptButton.click();
    }

    async navigateToPage(pageNumber=0) {
        let targetPageLink = pageNumber === 0 
        ? this.paginationLink.locator('li:nth-last-child(2) a')
        : this.paginationLink.locator(`li:nth-child(${pageNumber + 1}) a`);
        
        if (await targetPageLink.isVisible()) {
            await targetPageLink.click();
            await this.page.waitForLoadState('networkidle');
        } else {
            throw new Error(`Page number ${pageNumber} link is not available or visible.`);
        }
        return this;
    }

    async navigateToNextPage() {
        const nextPageButton = this.paginationLink.locator('span', { hasText: 'Next' });
        if (await nextPageButton.isVisible()) {
            await nextPageButton.click();
            await this.page.waitForLoadState('networkidle');
        }
        return this;
    }

    async navigateToPreviousPage() {
        const prevPageButton = this.paginationLink.locator('span', { hasText: 'Previous' });
        if (await prevPageButton.isVisible()) {
            await prevPageButton.click();
            await this.page.waitForLoadState('networkidle');
        }
        return this;
    }

    async verifyValuesInTable(valuesToFind) {
        const rows = this.generalTable.locator('tr');
        const rowCount = await rows.count();
        let foundValues = {}; // Object to store results of found values
        let found = false;

        // Initialize foundValues with each value set to null
        for (const value of valuesToFind) {
            foundValues[value] = null;
        }

        for (let i = 0; i < rowCount; i++) {
            const cells = rows.nth(i).locator('td');
            const cellCount = await cells.count();
            for (let j = 0; j < cellCount; j++) {
                const cellText = await cells.nth(j).textContent();
                // Check each value in valuesToFind
                for (const value of valuesToFind) {
                    if (cellText.trim() === value && foundValues[value] === null) { // Only update if not already found
                        foundValues[value] = { row: i + 1, column: j + 1 };
                    }
                }
            }
            // Check if all values are found to possibly break early
        found = Object.values(foundValues).every(location => location !== null);
        if (found) break;
        }
        // Assert that all values were found
    for (const [value, location] of Object.entries(foundValues)) {
        if (location === null) {
            console.log(`'${value}' not found in the table.`);
        } else {
            console.log(`Found '${value}' in row ${location.row}, column ${location.column}.`);
        }
        expect(location, `${value} found in the table`).not.toBeNull();
    }
    }
}

module.exports = BasePage;