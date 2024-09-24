import fs from 'fs';
import * as CryptoJS from 'crypto-js';
import type { Page } from '@playwright/test';
import { BrowserContext, expect } from '@playwright/test';
import { Workbook } from 'exceljs';
import { testConfig } from  '../testConfig';
import * as pdfjslib from 'pdfjs-dist-es5';
import { TextItem } from 'pdfjs-dist-es5/types/src/display/api';


export class WebActions {
    readonly page: Page;
    // readonly context: BrowserContext;

    constructor(page: Page) {
        this.page = page;
    }

    async decipherPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        // const cipher = CryptoJS.AES.encrypt('Demouat@09',key);
        // console.log(cipher.toString());
        return CryptoJS.AES.decrypt(testConfig.password, key).toString(CryptoJS.enc.Utf8);
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }

    async clickElementJS(locator: string): Promise<void> {
        await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async readDataFromExcel(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string> {
        const workbook = new Workbook();
        return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
            const sheet = workbook.getWorksheet(sheetName);
            return sheet!.getRow(rowNum).getCell(cellNum).toString();
        });
    }

    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    async writeDataIntoTextFile(filePath: number | fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        fs.writeFile(filePath, data, (error) => {
            if (error)
                throw error;
        });
    }

    async getPdfPageText(pdf: pdfjslib.PDFDocumentProxy, pageNo: number): Promise<string> {
        const page: pdfjslib.PDFPageProxy = await pdf.getPage(pageNo);
        const tokenizedText = await page.getTextContent();

        // Explicitly type tokenizedText.items
        const items = tokenizedText.items as TextItem[];
        const pageText = items.map((token: TextItem) => token.str).join('');
        
        return pageText;
    }

    async getPDFText(filePath: string): Promise<string> {
        const dataBuffer = fs.readFileSync(filePath);
        const pdf: pdfjslib.PDFDocumentProxy = await pdfjslib.getDocument({ data: dataBuffer }).promise;
        const maxPages = pdf.numPages;
        const pageTextPromises: Promise<string>[] = [];

        for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
            pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
        }

        const pageTexts = await Promise.all(pageTextPromises);
        return pageTexts.join(' ');
    }

  

    public writeEnvVariable(key: string, value: string) {
        let envContent = fs.readFileSync('.env', 'utf8');
      
        const regex = new RegExp(`^${key}=.*`, 'gm');
        if (envContent.match(regex)) {
          envContent = envContent.replace(regex, `${key}=${value}`);
        } else {
          envContent += `\n${key}=${value}`;
        }
        fs.writeFileSync('.env', envContent);
    }  
}