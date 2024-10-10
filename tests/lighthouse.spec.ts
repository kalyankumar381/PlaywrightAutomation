import { chromium } from 'playwright';
import * as fs from 'fs';
import { test } from '@playwright/test';
import chromeLauncher from 'chrome-launcher';
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

