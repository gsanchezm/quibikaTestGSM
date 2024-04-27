const { expect } = require('@playwright/test');
const BasePage = require('./BasePage')

class CategoryTypesPage extends BasePage{
    constructor(page) {
        super(page)
        this.categorynameField  = page.getByPlaceholder('Nombre de categoría');
        this.isSubcategoryCheckBox  = page.locator('label').filter({ hasText: 'Es subcategoria?' });
        this.subcategoryField = page.getByRole('combobox').getByRole('textbox');
        this.subcategoryRow = page.getByLabel('Adicionar tipo de categoría').locator('span').nth(1)
      }

       async categoryNameAs(categoryName) {
         await this.categorynameField.fill(categoryName);
         return this; 
        }

         async isSubcategoryFrom(subcategoryName) {
             await this.isSubcategoryCheckBox.click();
             await this.subcategoryRow.click();
             await this.page.locator(`//*[@role="option"]//span[contains(text(),'${subcategoryName}')]`);
             return this;  
         }
}

module.exports = CategoryTypesPage;