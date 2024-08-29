import { Agent } from "http";
import test, { expect, Page } from "playwright/test";



test('First Test ', async({page}) => {
  await page.goto("http://rxtesting.yappes-enterprise.com/login/api-manager?expired=true");
  await page.waitForTimeout(4000);
  await page.locator('//*[@placeholder="Enter your Email"]').fill("kalyan.kumar@yappes.com");
  await page.locator('//*[@placeholder="Password"]').fill("Anusha*1234");
  await page.locator("//*[@class='mantine-1ryt1ht mantine-Button-label']").click();
  await page.waitForTimeout(4000);
  const txt=await page.locator("//span[@class='mantine-1ryt1ht mantine-Button-label']/div").innerText();
  console.log(await page.getByText("Kalyan").innerText());
  expect("kalyan\nplatform-admin","message is displaywing and successfully loging .....");
  await getRowsAndColumns(page);

  console.log(" >>>>>>>>>>>>>>>>>>>>>>. :: "+await getCellValue(page,"Organization Name",3));

  console.log("Text is present in the table >>>>>>>>>>>>> :: " + await isTextPresentInTable(page,"monitortest"));

});


async function getRowsAndColumns(page:Page): Promise<void> {
  const tableSelector = '.ag-center-cols-container';
  await page.waitForSelector(tableSelector);
  const rows = await page.$$(`${tableSelector} .ag-row`);
  for (let i = 0; i < rows.length; i++) {
      const columns = await rows[i].$$('.ag-cell');

      console.log(`Row ${i + 1} has ${columns.length} columns.`);
      for (let j = 0; j < columns.length; j++) {
          const columnText = await columns[j].textContent();
          console.log(`Row ${i + 1}, Column ${j + 1}: ${columnText?.trim()}`);
      }
  }
}

async function getRowsAndColumn(page:Page){
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
                const columnElement = await page.waitForSelector(`xpath=${columnXPath}`);
                const columnText = await columnElement?.textContent();
                console.log(`Row ${i}, Column ${j}: ${columnText?.trim()}`);
            }
        }
}

async function getHeaderIndex(page:Page, headerName: string): Promise<number | null> {
  const headerSelector = '.ag-header-container .ag-header-cell-label';

  try {
      await page.waitForSelector('.ag-root.ag-unselectable.ag-layout-normal', { timeout: 30000 });
      const headers = await page.$$(headerSelector);

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

async function getCellValue(page:Page, headerName: string, rowNumber: number): Promise<string | null> {
  try {
      const headerIndex = await getHeaderIndex(page,headerName);
      if (headerIndex === null) {
          console.error(`Header "${headerName}" not found`);
          return null;
      }

      const cellSelector = `.ag-center-cols-container .ag-row:nth-child(${rowNumber}) .ag-cell:nth-child(${headerIndex + 1})`;
      const cell = await page.$(cellSelector);

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
async function isTextPresentInTable(page:Page, text: string): Promise<boolean> {
  const tableSelector = '.ag-center-cols-container';
  const cellSelector = '.ag-center-cols-container .ag-row .ag-cell';

  try {
      // Wait for the table to be visible
      await page.waitForSelector(tableSelector, { timeout: 30000 });

      // Get all cell elements
      const cells = await page.$$(cellSelector);

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


