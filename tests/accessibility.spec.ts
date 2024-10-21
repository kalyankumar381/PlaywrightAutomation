/* eslint-disable @typescript-eslint/no-var-requires */
import {test} from '../src/test-base'; 
import * as dotenv from 'dotenv';
dotenv.config();
import projectRootDirectory from 'project-root-directory';
import fs from 'fs';
import { AxeUtil } from '../src/axe-util';
import { expect } from '../pages/basePage';
import LogingPage from '../pages/login.page';
import CommonPage from '../pages/common.page';
import myAPIPage from '../pages/myApi.page';
import Wrapper from '../src/wrapper';
import Env from '../utils/environment';
import * as data from '../data/login.json';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uaParser = require('ua-parser-js');

/**
 * Description : generate Axe scan and verify .json and .html file created.
 * Author : Kalyan
 */
test('verify axe scan and files @regression', async ({ page,global }, testInfo) => {
    let login:LogingPage=new LogingPage(page);
    let commonPage:CommonPage=new CommonPage(page);
    
    let myApiPage:myAPIPage=new myAPIPage(page);
    const wrapper=new Wrapper(page);
  


    const axeUtil=new AxeUtil(testInfo);
    await test.step('Navihgate to login page',async()=>{
        await page.goto(Env.test);
      });
    
      await test.step('Login with valid credentials',async()=>{
        await login.login1(data.email,data.pass);
        await page.waitForTimeout(3000);
      })
      await test.step('Navigate to My API page ', async()=>{
        await commonPage.clickSideBar("Manage APIs");
        await commonPage.clickSideBar("My APIs");
        await page.waitForTimeout(3000); 
      })    

   
    await axeUtil.scan(page, 'My APIs');

    if (process.env.PWG_ENV_AXE_SCAN_ENABLE === 'true') {
        if (fs.existsSync(projectRootDirectory + '/axe-reports')) {
            const prjFloderName = fs.readdirSync(projectRootDirectory + '/axe-reports/');
            console.log(`Axe folder : ${prjFloderName}`);

            // Axe constants
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = testInfo.project.name;
            const testClassFileName = require('path').parse(testInfo.file).base;
            const testCase = testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath =
                configProjectName.length === 0
                    ? 'axe-reports/' + prjFloderName[0] + '/' + testClassFileName + '/' + testCase + '-' + browser
                    : 'axe-reports/' + prjFloderName[0] + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;

            const axeFiles = fs.readdirSync(axeReportpath);

            // verification
            expect('My APIs.html').toBe(axeFiles[0]);
            expect('My APIs.json').toBe(axeFiles[1]);
            const filePath=axeReportpath+"/"+axeFiles[0];

            testInfo.attach(`accessibility Report - My APIs`, {
              body: fs.readFileSync(filePath),
              contentType: 'text/html',
            });
            //expect(axeFiles[1]).toBe("sample.json");
        } else {
            console.log('Folder does not exist');
            test.fail();
        }
    } else {
        console.log('AXE_SCAN not enabled');
    }
});

test('verify axe scan and Application files @regression', async ({ page,global }, testInfo) => {
    let login:LogingPage=new LogingPage(page);
    let commonPage:CommonPage=new CommonPage(page);
    let myApiPage:myAPIPage=new myAPIPage(page);
    const wrapper=new Wrapper(page);
  


    const axeUtil=new AxeUtil(testInfo);
    await test.step('Navihgate to login page',async()=>{
        await page.goto(Env.test);
      });
    
      await test.step('Login with valid credentials',async()=>{
        await login.login1(data.email,data.pass);
        await page.waitForTimeout(3000);
      })
      await test.step('Navigate to My API page ', async()=>{
        await commonPage.clickSideBar("Manage APIs");
        await commonPage.clickSideBar("Application");
        await page.waitForTimeout(3000); 
      })
    

    await axeUtil.scan(page, 'Application');

    if (process.env.PWG_ENV_AXE_SCAN_ENABLE === 'true') {
        if (fs.existsSync(projectRootDirectory + '/axe-reports')) {
            const prjFloderName = fs.readdirSync(projectRootDirectory + '/axe-reports/');
            console.log(`Axe folder : ${prjFloderName}`);

            // Axe constants
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = testInfo.project.name;
            const testClassFileName = require('path').parse(testInfo.file).base;
            const testCase = testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath =
                configProjectName.length === 0
                    ? 'axe-reports/' + prjFloderName[0] + '/' + testClassFileName + '/' + testCase + '-' + browser
                    : 'axe-reports/' + prjFloderName[0] + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;

            const axeFiles = fs.readdirSync(axeReportpath);

            // verification
            expect('WhyEllucian.html').toBe(axeFiles[0]);
            expect('WhyEllucian.json').toBe(axeFiles[1]);
            //expect(axeFiles[1]).toBe("sample.json");
        } else {
            console.log('Folder does not exist');
            test.fail();
        }
    } else {
        console.log('AXE_SCAN not enabled');
    }
});

test('verify axe scan on specific part and files @regression', async ({ page, global }, testInfo) => {
    const axeUtil=new AxeUtil(testInfo);
    await page.goto('https://www.ellucian.com/');
    await axeUtil.scan(page, 'PromoContent', '#promo-148061 > div > div.promo-content.col-md-8.d-flex.flex-md-row');
    if (process.env.PWG_ENV_AXE_SCAN_ENABLE === 'true') {
        if (fs.existsSync(projectRootDirectory + '/axe-reports')) {
            const prjFloderName = fs.readdirSync(projectRootDirectory + '/axe-reports/');
            console.log(`Axe folder : ${prjFloderName}`);

            // Axe constants
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = testInfo.project.name;
            const testClassFileName = require('path').parse(testInfo.file).base;
            const testCase = testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath =
                configProjectName.length === 0
                    ? 'axe-reports/' + prjFloderName[0] + '/' + testClassFileName + '/' + testCase + '-' + browser
                    : 'axe-reports/' + prjFloderName[0] + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;

            const axeFiles = fs.readdirSync(axeReportpath);

            // verification
            expect('PromoContent_Element.html').toBe(axeFiles[0]);
            expect('PromoContent_Element.json').toBe(axeFiles[1]);
        } else {
            console.log('Folder does not exist');
            test.fail();
        }
    } else {
        console.log('AXE_SCAN not enabled');
    }
});
test('verify axe scan on multi selectors @regression', async ({ page, global }, testInfo) => {
    const axeUtil=new AxeUtil(testInfo);
    await page.goto('https://www.ellucian.com/');
    await axeUtil.scan(page, 'promo-content-Menu', ['#promo-148061 > div > div.promo-content.col-md-8.d-flex.flex-md-row', '#block-mainnavv2northamerica > div.navbar-menu.d-none.d-xl-block > ul > li.menu-item--cta.nav-item > a']);
    if (process.env.PWG_ENV_AXE_SCAN_ENABLE === 'true') {
        if (fs.existsSync(projectRootDirectory + '/axe-reports')) {
            const prjFloderName = fs.readdirSync(projectRootDirectory + '/axe-reports/');
            console.log(`Axe folder : ${prjFloderName}`);

            // Axe constants
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = testInfo.project.name;
            const testClassFileName = require('path').parse(testInfo.file).base;
            const testCase = testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath =
                configProjectName.length === 0
                    ? 'axe-reports/' + prjFloderName[0] + '/' + testClassFileName + '/' + testCase + '-' + browser
                    : 'axe-reports/' + prjFloderName[0] + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;

            const axeFiles = fs.readdirSync(axeReportpath);

            // verification
            expect('promo-content-Menu_Element.html').toBe(axeFiles[0]);
            expect('promo-content-Menu_Element.json').toBe(axeFiles[1]);
        } else {
            console.log('Folder does not exist');
            test.fail();
        }
    } else {
        console.log('AXE_SCAN not enabled');
    }
});
test('verify axe scan by excluding selectors @regression', async ({ page, global }, testInfo) => {
    const axeUtil=new AxeUtil(testInfo);
    await page.goto('https://reportportal.10339.elluciancloud.com/ui/#login');
    await axeUtil.scan(page, 'RPLogin')
    if (process.env.PWG_ENV_AXE_SCAN_ENABLE === 'true') {
        if (fs.existsSync(projectRootDirectory + '/axe-reports')) {
            const prjFloderName = fs.readdirSync(projectRootDirectory + '/axe-reports/');
            console.log(`Axe folder : ${prjFloderName}`);

            // Axe constants
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = testInfo.project.name;
            const testClassFileName = require('path').parse(testInfo.file).base;
            const testCase = testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath =
                configProjectName.length === 0
                    ? 'axe-reports/' + prjFloderName[0] + '/' + testClassFileName + '/' + testCase + '-' + browser
                    : 'axe-reports/' + prjFloderName[0] + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;

            const axeFiles = fs.readdirSync(axeReportpath);

            // verification
            expect('RPLogin.html').toBe(axeFiles[0]);
            expect('RPLogin.json').toBe(axeFiles[1]);
        } else {
            console.log('Folder does not exist');
            test.fail();
        }
    } else {
        console.log('AXE_SCAN not enabled');
    }
});

import injectAxe, { AxeBuilder } from '@axe-core/playwright';  
import checkA11y from '@axe-core/playwright'; 
import path from 'path';
test('Accessibility test', async ({ page},testInfo) => {
    let login:LogingPage=new LogingPage(page);
    let commonPage:CommonPage=new CommonPage(page);
    let myApiPage:myAPIPage=new myAPIPage(page);
    const wrapper=new Wrapper(page);
    await test.step('Navihgate to login page',async()=>{
        await page.goto(Env.test);
      });
    
      await test.step('Login with valid credentials',async()=>{
        await login.login1(data.email,data.pass);
        await page.waitForTimeout(3000);
      })
      await test.step('Navigate to My API page ', async()=>{
        await commonPage.clickSideBar("Manage APIs");
        await commonPage.clickSideBar("My APIs");
        await page.waitForTimeout(3000); 
      })

//   // Inject Axe accessibility testing library into the page
//   const axe = new AxeBuilder({ page });

//   // Check for accessibility violations
//   const results = await axe.analyze();
//   console.log('Accessibility audit results:', results);

//   // You can log or process the results, but we'll attach it to Allure
//   console.log(results);

//   // Generate a simple HTML report
//   const reportHtml = `
//     <html>
//       <head><title>Axe Accessibility Report</title></head>
//       <body>
//         <h1>Accessibility Violations</h1>
//         <ul>
//           ${results.violations.map(v => `<li>${v.id}: ${v.description}</li>`).join('')}
//         </ul>
//       </body>
//     </html>
//   `;

//   const reportDirectory = 'axe-report';
//   if (!fs.existsSync(reportDirectory)) {
//     fs.mkdirSync(reportDirectory);
//   }

//   const reportFilePath = path.join(reportDirectory, `axe-report-${Date.now()}.html`);
//   fs.writeFileSync(reportFilePath, reportHtml); // Save the report

//   console.log(`Accessibility report generated: ${reportFilePath}`);

// / Step 2: Run Axe accessibility checks for specified WCAG standards
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
    .analyze();

  // Step 3: Generate the JSON report
  const reportDirectory = 'axe-report';
  if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory);
  }
  
  const reportJsonFilePath = path.join(reportDirectory, `axe-report-${Date.now()}.json`);
  fs.writeFileSync(reportJsonFilePath, JSON.stringify(results, null, 2)); // Pretty-print JSON

  // Step 4: Generate the HTML report with table format
  const htmlReportContent = `
    <html>
      <head>
        <title>A11y Report</title>
        <style>
          table { font-family: Arial, sans-serif; border-collapse: collapse; width: 100%; }
          td, th { border: 1px solid #dddddd; text-align: left; padding: 8px; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Accessibility Violations</h1>
        <table>
          <tr>
            <th>Violation ID</th>
            <th>Description</th>
            <th>Impact</th>
            <th>Help URL</th>
          </tr>
          ${results.violations.map(v => `
            <tr>
              <td>${v.id}</td>
              <td>${v.description}</td>
              <td>${v.impact}</td>
              <td><a href="${v.helpUrl}" target="_blank">${v.helpUrl}</a></td>
            </tr>
          `).join('')}
        </table>
      </body>
    </html>
  `;

  const reportHtmlFilePath = path.join(reportDirectory, `axe-report-${Date.now()}.html`);
  fs.writeFileSync(reportHtmlFilePath, htmlReportContent);

  // Step 5: Attach both the JSON and HTML reports to Allure
  testInfo.attach('Axe Accessibility JSON Report', {
    body: fs.readFileSync(reportJsonFilePath),
    contentType: 'application/json',
  });

  testInfo.attach('Axe Accessibility HTML Report', {
    body: fs.readFileSync(reportHtmlFilePath),
    contentType: 'text/html',
  });

  // Optionally: Fail the test if any violations are found
  if (results.violations.length > 0) {
    throw new Error('Accessibility violations found');
  }

  // Attach the HTML report to Allure
  testInfo.attach('Axe Accessibility Report', {
    body: fs.readFileSync(reportHtmlFilePath),
    contentType: 'text/html',
  });
});


