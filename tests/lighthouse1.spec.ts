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
import lighthouse from 'lighthouse';
import { info } from 'console';
import path from 'path';
import Wrapper from '../src/wrapper';

let login:LogingPage;
let commonPage:CommonPage;
let myApiPage:myAPIPage;




test('un-auth', async ({}) => {
  const browser = await chromium.launch({
    args: ['--remote-debugging-port=9222'],
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(Env.test);

  console.log('Starting Lighthouse audit...');

  try {
    // Dynamically import the playwright-lighthouse module
    const { playAudit } = await import('playwright-lighthouse');

  // Use the Lighthouse default configuration for desktop
  const config = {   
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop' as const, // Explicitly set the type to 'desktop'\
      logLevel : info,
      screenEmulation: {
        mobile: false,
      },
    },
  };

  const options={
    logLevel :info,
  }

    await playAudit({
      config:config,
      thresholds: {
        performance: 50,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 50,
      },
      ignoreError: true,
      port: 9222,
      page: page,
      reports: {
        formats: { html: true, json: false, csv: false },
        name: `Lighthouse-report-${Date.now()}`,
        directory: 'Lighthouse-report',
      },
    });
  } catch (err) {
    console.error('Error during Lighthouse audit:', err);
  }

  await page.close();
  await context.close();
  await browser.close();
  console.log('Lighthouse audit completed.');
});


test('Lighthouse sample', async ({},testInfo) => {
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

  await test.step('Navigate to Application page',async()=>{
    await commonPage.clickSideBar("Application");
    const url=await page.url();
    console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);4
    console.log("Title is >>>>>>>>>>>>>>>>>>>> :: " + await page.title());
    await wrapper.lighthouseGenerate(url,await page.title(),testInfo);
  });

  await test.step('Navigate to API Groups page',async()=>{
    await commonPage.clickSideBar("API Groups");
    const url=await page.url();
    console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);4
    console.log("Title is >>>>>>>>>>>>>>>>>>>> :: " + await page.title());
    await wrapper.lighthouseGenerate(url,await page.title(),testInfo);
  });

   await browser.close();
});




test('Lighthouse sample11', async ({}, testInfo) => {
  console.log('Test started.');
  testInfo.setTimeout(120000); // Set timeout to 120 seconds for slow tests

  // Step 1: Launch Playwright Chromium
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Step 2: Dynamically import chrome-launcher
  const chromeLauncher = await import('chrome-launcher');

  // Step 3: Launch Chrome using Chrome Launcher (for Lighthouse)
  const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless'],
  });

  const options: any = {
      port: chrome.port,
      output: 'html', // Can be json, html, csv
      onlyCategories: ['performance', 'accessibility', 'seo'], // Customize categories
  };

  // Step 4: Navigate to the target page using Playwright
  const login: LogingPage = new LogingPage(page);
  const commonPage: CommonPage = new CommonPage(page);
  const myApiPage: myAPIPage = new myAPIPage(page);

  await page.goto(Env.test);
  await login.login1(data.email, data.pass);
  await page.waitForTimeout(3000);
  await commonPage.clickSideBar("Manage APIs");
  await commonPage.clickSideBar("My APIs");
  await page.waitForTimeout(3000); // Adjust timeout as necessary

  // Step 5: Get the current URL for Lighthouse
  const url = await page.url();
  console.log("URL is >>>>>>>>>>>>>>>>>>>> :: " + url);

  // Ensure Lighthouse is dynamically imported correctly
  const lighthouse = (await import('lighthouse')).default; // Access the default export
  const runnerResult: any = await lighthouse(url, options);

  // Step 6: Log Lighthouse results
  console.log('Lighthouse score:', runnerResult.lhr.categories.performance.score);

  // Save Lighthouse report
  const reportHtml = runnerResult.report; // For HTML report
  fs.writeFileSync('lighthouse-report.html', reportHtml); // Save the report

  // Close the browser instances
  await browser.close();
  await chrome.kill();
});


async function  lighthouseGenerate(url:string){

  // Step 2: Dynamically import chrome-launcher
  const chromeLauncher = await import('chrome-launcher');

  // Step 3: Launch Chrome using Chrome Launcher (for Lighthouse)
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  });
  const options: any = {
    port: chrome.port,
    output: 'html', // Can be json, html, csv
    onlyCategories: ['performance','accessibility', 'seo','pwa'], // Customize categories
    formFactor:'desktop',
    throttling: {  // Customize throttling settings
      rttMs: 40,
      throughputKbps: 10240,
      cpuSlowdownMultiplier: 1,
    },
    screenEmulation: { // Ensure screenEmulation is set for desktop
      mobile: false,
      width: 1350,
      height: 940,
      deviceScaleFactor: 1,
      disabled: false, // Must explicitly disable if you want desktop emulation
    },
    logLevel: 'info',
  };


  const lighthouse = (await import('lighthouse')).default; // Ensure to access the default export
  const runnerResult: any = await lighthouse(url, options);


  // Step 6: Log Lighthouse results
  console.log('Lighthouse score:', runnerResult.lhr.categories.performance.score);

  const reportDirectory = 'Lighthouse-report';
  if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory);
    console.log(`Created directory: ${reportDirectory}`);
  } else {
    console.log(`Directory already exists: ${reportDirectory}`);
  }

  // Save the report in the specified directory with a unique name
  const reportHtmlContent = runnerResult.report;

  // Debugging: Check if reportHtml is generated correctly
  if (!reportHtmlContent) {
    console.error('Error: Lighthouse report is empty.');
    await chrome.kill();
    return; // Exit if report is empty
  }

  const reportFileName = `Lighthouse-report-${Date.now()}.html`;
  const reportFilePath = path.join(reportDirectory, reportFileName); // Combine directory and filename

  

  // Debugging: Attempt to write the file
  try {
    fs.writeFileSync(reportFilePath, reportHtmlContent); // Save the report
    console.log(`Report saved: ${reportFilePath}`);
  } catch (err) {
    console.error('Error saving report:', err);
  }


  // Close the browser instances
  // await browser.close();
  await chrome.kill();


}
