import { Page } from "playwright";
import { expect } from "playwright/test";

export default class myAPIPage{
    private page: Page;
    constructor(page:Page){
        this.page=page;
    }

    public get eleMockApiBtn(){
        return this.page.locator("//span[text()='Mock API']")
    }

    public get eleOnboardApiBtn(){
        return this.page.locator("//span[text()='Onboard API']");
    }

    public get eleApiNameInput(){
        return this.page.locator("[placeholder='Unique name for API']");
    }

    public get eleApiDesTextArea(){
        return this.page.locator("[placeholder='Provide summary for API']");
    }

    public get eleApiSaveBtn(){
        return this.page.locator("//span[text()='Save']");
    }
    public get eleApiCanelBtn(){
        return this.page.locator("//span[text()='Cancel']");
    }

    public get eleApiDeleteBtn(){
        return this.page.locator("#apiDeleteBtn");
    }

    public get eleDailogDelete(){
        return this.page.getByRole('button', { name: 'Delete' })
    }

    


    public async creatMockApi(apName:string, apiDis?:string ){
        await this.eleMockApiBtn.click();
        await this.page.waitForTimeout(3000);
        await this.eleApiNameInput.fill(apName);
        if(apiDis!==undefined){
            await this.eleApiDesTextArea.fill(apiDis);
        }
        await this.eleApiSaveBtn.click();

        const creTxt=await this.page.locator(`//span[text()='- ${apName}']`).innerText();
        console.log(">>>>>>>>>>>>>>>>>>> " + creTxt);
        expect(creTxt).toBe(`Create Mock API - ${apName}`)
    }

    public async deleteMockApi(){
        await this.eleApiDeleteBtn.click();
        
    }

    public async dialogDelete(){
        await this.eleDailogDelete.click();
    }


    public async  getRowsAndColumns(): Promise<void> {
        const tableSelector = '.ag-center-cols-container';
        await this.page.waitForSelector(tableSelector);
        const rows = await this.page.$$(`${tableSelector} .ag-row`);
        for (let i = 0; i < rows.length; i++) {
            const columns = await rows[i].$$('.ag-cell');
    
            console.log(`Row ${i + 1} has ${columns.length} columns.`);
            for (let j = 0; j < columns.length; j++) {
                const columnText = await columns[j].textContent();
                console.log(`Row ${i + 1}, Column ${j + 1}: ${columnText?.trim()}`);
            }
        }
    }
    
    public async  getRowsAndColumn(){
            const baseXPath = "[class='ag-center-cols-container']";
            
            // Get the count of rows
            const rowCount = await this.page.evaluate((xpath) => {
                const elements = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                return elements.snapshotLength;
            }, `${baseXPath}/div`);
    
            // Iterate through each row and column
            for (let i = 1; i <= rowCount; i++) {
                // XPath for the current row
                const rowXPath = `${baseXPath}/div[${i}]`;
    
                // Get the count of columns in the current row
                const columnCount = await this.page.evaluate((xpath) => {
                    const rowElement:any = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (rowElement) {
                        return rowElement.children.length;
                    }
                    return 0;
                }, rowXPath);
    
                console.log(`Row ${i} has ${columnCount} columns.`);
    
                // Iterate through each column in the current row
                for (let j = 1; j <= columnCount; j++) {
                    // XPath for the current column
                    const columnXPath = `${rowXPath}/div[${j}]`;
    
                    // Perform actions on the column element
                    const columnElement = await this.page.waitForSelector(`xpath=${columnXPath}`);
                    const columnText = await columnElement?.textContent();
                    console.log(`Row ${i}, Column ${j}: ${columnText?.trim()}`);
                }
            }
    }
    
    public async  getHeaderIndex(headerName: string): Promise<number | null> {
        const headerSelector = '.ag-header-container .ag-header-cell-label';
    
        try {
            await this.page.waitForSelector('.ag-root.ag-unselectable.ag-layout-normal', { timeout: 30000 });
            const headers = await this.page.$$(headerSelector);
    
            for (let i = 0; i < headers.length; i++) {
                const headerText = await headers[i].textContent();
                if (headerText?.trim() === headerName) {
                    return i;
                }
            }
    
            return null; // Header not found
        } catch (error) {
            console.error('Error in getHeaderIndex:', error);
            return null;
        }
    }
    
    public async  getCellValue(headerName: string, rowNumber: number): Promise<string | null> {
        try {
            const headerIndex = await this.getHeaderIndex(headerName);
            if (headerIndex === null) {
                console.error(`Header "${headerName}" not found`);
                return null;
            }
    
            const cellSelector = `.ag-center-cols-container .ag-row:nth-child(${rowNumber}) .ag-cell:nth-child(${headerIndex + 1})`;
            const cell = await this.page.$(cellSelector);
    
            if (cell) {
                const cellText = await cell.textContent();
                return cellText?.trim() || '';
            } else {
                console.error(`Cell not found for header "${headerName}" in row ${rowNumber}`);
                return null;
            }
        } catch (error) {
            console.error('Error in getCellValue:', error);
            return null;
        }
    }
    
    
    // check text is present in the table or not
    public async isTextPresentInTable(text: string): Promise<boolean> {
        const tableSelector = '.ag-center-cols-container';
        const cellSelector = '.ag-center-cols-container .ag-row .ag-cell';
    
        try {
            // Wait for the table to be visible
            await this.page.waitForSelector(tableSelector, { timeout: 30000 });
    
            // Get all cell elements
            const cells = await this.page.$$(cellSelector);
    
            for (const cell of cells) {
                const cellText = await cell.textContent();
                if (cellText?.includes(text)) {
                    return true;
                }
            }
    
            return false; // Text not found in any cell
        } catch (error) {
            console.error('Error in isTextPresentInTable:', error);
            return false;
        }
    }

    public async clickLastColumnIfTextPresent(text: string): Promise<boolean> {
        const tableSelector = '.ag-center-cols-container';
        const rowSelector = '.ag-center-cols-container .ag-row';
        const cellSelector = '.ag-center-cols-container .ag-row .ag-cell';

        try {
            // Wait for the table to be visible
            await this.page.waitForSelector(tableSelector, { timeout: 30000 });

            // Get all row elements
            const rows = await this.page.$$(rowSelector);

            for (const row of rows) {
                // Get all cells in the current row
                const cells = await row.$$(cellSelector);

                // Check if any cell in the row contains the desired text
                for (const cell of cells) {
                    const cellText = await cell.textContent();
                    if (cellText?.includes(text)) {
                        // Click the last cell in the row (column six)
                        const lastCell = cells[cells.length - 1];
                        await lastCell.click();
                        return true;
                    }
                }
            }

            return false; // Text not found in any row
        } catch (error) {
            console.error('Error in clickLastColumnIfTextPresent:', error);
            return false;
        }
    }

    public async clickButtonInRowByText(text: string): Promise<boolean> {
        const tableSelector = '.ag-center-cols-container';
        const rowSelector = '.ag-center-cols-container .ag-row';
        const cellSelector = '.ag-cell';

        try {
            // Wait for the table to be visible
            await this.page.waitForSelector(tableSelector, { timeout: 30000 });

            // Get all rows
            const rows = await this.page.$$(rowSelector);

            for (const row of rows) {
                // Get all cells in the current row
                const cells = await row.$$(cellSelector);
                for (const cell of cells) {
                    const cellText = await cell.textContent();
                    if (cellText?.includes(text)) {
                        // If text matches, find the last column cell within this row and click the button
                        const lastColumnCell = cells[cells.length - 1]; // Assuming the last cell is the button's container
                        const button = await lastColumnCell.$('button');
                        await this.page.waitForTimeout(1000);
                        if (button) {
                            await button.click();
                            await this.page.waitForTimeout(1000);
                            return true;
                        }
                    }
                }
            }

            return false; // Text not found or button click failed
        } catch (error) {
            console.error('Error in clickButtonInRowByText:', error);
            return false;
        }
    }


    // const columnNames = await page.$$eval(
    //     "//div[contains(@class, 'ag-header-cell')]//span[contains(@class, 'ag-header-cell-text')]",
    //     headers => headers.map(header => header.textContent?.trim())
    //   );

    //   console.log(columnNames);
    

}