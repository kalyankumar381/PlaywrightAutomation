import { chromium } from 'playwright';
import * as fs from 'fs';
import { test } from '@playwright/test';
import chromeLauncher from 'chrome-launcher';
import { playAudit } from 'playwright-lighthouse';
import LogingPage from '../pages/login.page';
import CommonPage from '../pages/common.page';
import myAPIPage from '../pages/myApi.page';
import * as data from '../data/login.json';
import Env from '../utils/environment';
import { AES } from 'crypto-js';
import Wrapper from '../src/wrapper';

let login:LogingPage;
let commonPage:CommonPage;
let myApiPage:myAPIPage;



// test('Lighthouse sample', async ({},testInfo) => {
//   console.log('Test started.');
//   testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

//   // Step 1: Launch Playwright Chromium
//   const browser = await chromium.launch({ headless: false });
//   const page = await browser.newPage();

//   // Step 2: Dynamically import chrome-launcher
//   const chromeLauncher = await import('chrome-launcher');

//   // Step 3: Launch Chrome using Chrome Launcher (for Lighthouse)
//   const chrome = await chromeLauncher.launch({
//     chromeFlags: ['--headless'],
//   });

//   const options: any = {
//     port: chrome.port,
//     output: 'html', // Can be json, html, csv
//     onlyCategories: ['performance','accessibility', 'seo'], // Customize categories
//   };

//   // Step 4: Navigate to the target page using Playwright
//   // await page.goto('https://google.com');
  

//   let login:LogingPage=new LogingPage(page);
//   let commonPage:CommonPage=new CommonPage(page);
//   let myApiPage:myAPIPage=new myAPIPage(page);

//   await page.goto(Env.test);
//   await login.login1(data.email,data.pass);
//   await page.waitForTimeout(3000);
//   await commonPage.clickSideBar("Manage APIs");
//   await commonPage.clickSideBar("My APIs");
//   await page.waitForTimeout(3000);

 
//   // Step 5: Run Lighthouse audits
//   // const lighthouse:any = await import('lighthouse');
//   // const runnerResult: any = await lighthouse('https://google.com', options);
//   const url=await page.url();
//   console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);

  
//   const lighthouse = (await import('lighthouse')).default; // Ensure to access the default export
//   const runnerResult: any = await lighthouse(url, options);


//   // Step 6: Log Lighthouse results
//   console.log('Lighthouse score:', runnerResult.lhr.categories.performance.score);

//   const reportHtml = runnerResult.report; // For HTML report
//   fs.writeFileSync('lighthouse-report.html', reportHtml); // Save the report

//   // Close the browser instances
//   await browser.close();
//   await chrome.kill();
// });




// test('Lighthouse sample11', async ({}, testInfo) => {
//   console.log('Test started.');
//   testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

//   // Step 1: Launch Playwright Chromium
//   const browser = await chromium.launch({ headless: false });
//   const page = await browser.newPage();

//   // Step 2: Dynamically import chrome-launcher
//   const chromeLauncher = await import('chrome-launcher');

//   // Step 3: Launch Chrome using Chrome Launcher (for Lighthouse)
//   const chrome = await chromeLauncher.launch({
//       chromeFlags: ['--headless'],
//   });

//   const options: any = {
//       port: chrome.port,
//       output: 'html', // Can be json, html, csv
//       onlyCategories: ['performance', 'accessibility', 'seo'], // Customize categories
//   };

//   // Step 4: Navigate to the target page using Playwright
//   const login: LogingPage = new LogingPage(page);
//   const commonPage: CommonPage = new CommonPage(page);
//   const myApiPage: myAPIPage = new myAPIPage(page);

//   await page.goto(Env.test);
//   await login.login1(data.email, data.pass);
//   await page.waitForTimeout(3000);
//   await commonPage.clickSideBar("Manage APIs");
//   await commonPage.clickSideBar("My APIs");
//   await page.waitForTimeout(3000); // Adjust timeout as necessary

//   // Step 5: Get the current URL for Lighthouse
//   const url = await page.url();
//   console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);

//   // Ensure Lighthouse is dynamically imported correctly
//   const lighthouse = (await import('lighthouse')).default; // Access the default export
//   const runnerResult: any = await lighthouse(url, options);

//   // Step 6: Log Lighthouse results
//   console.log('Lighthouse score:', runnerResult.lhr.categories.performance.score);

//   // Save Lighthouse report
//   const reportHtml = runnerResult.report; // For HTML report
//   fs.writeFileSync('lighthouse-report.html', reportHtml); // Save the report

//   // Close the browser instances
//   await browser.close();
//   await chrome.kill();
// });


test('Navigate to My APIs', async ({},testInfo) => {
  console.log('Test started.');
  testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

  // Step 1: Launch Playwright Chromium
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();


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


    const url=await page.url();
    console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);4
    console.log("Title is >>>>>>>>>>>>>>>>>>>> :: " + await page.title());
    await wrapper.lighthouseGenerate(url,await page.title(),testInfo);

   await browser.close();
});

test('Navigate to Application', async ({},testInfo) => {
  console.log('Test started.');
  testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

  // Step 1: Launch Playwright Chromium
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();


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
    await commonPage.clickSideBar("Application");
    await page.waitForTimeout(3000); 
  })


    const url=await page.url();
    console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);4
    console.log("Title is >>>>>>>>>>>>>>>>>>>> :: " + await page.title());
    await wrapper.lighthouseGenerate(url,await page.title(),testInfo);


   await browser.close();
});


test('Navigate to API Groups', async ({},testInfo) => {
  console.log('Test started.');
  testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

  // Step 1: Launch Playwright Chromium
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();


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
    await commonPage.clickSideBar("API Groups");
    await page.waitForTimeout(3000); 
  })


  const url=await page.url();
  console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);4
  console.log("Title is >>>>>>>>>>>>>>>>>>>> :: " + await page.title());
  await wrapper.lighthouseGenerate(url,await page.title(),testInfo);

   await browser.close();
});

