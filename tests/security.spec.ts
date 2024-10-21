import { chromium } from 'playwright';
import Env from '../utils/environment';
import LogingPage from '../pages/login.page';
import CommonPage from '../pages/common.page';
import myAPIPage from '../pages/myApi.page';
import Wrapper from '../src/wrapper';
import * as data from '../data/login.json';
import { test } from 'playwright/test';



// test('Sample security testing',(async () => {
test('Sample security testing',async({})=>{
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  let login:LogingPage=new LogingPage(page);
  let commonPage:CommonPage=new CommonPage(page);
  let myApiPage:myAPIPage=new myAPIPage(page);
  const wrapper=new Wrapper(page);

  page.on('request', request => {
    console.log('Request: ' + request.url());
  });
  
  page.on('response', response => {
    console.log('Response: ' + response.url() + ' Status: ' + response.status());
  });

  await page.goto(Env.test);

  // Input potential SQL injection in login field
  await login.login1(data.email,data.pass);
  await page.waitForTimeout(3000);

  // Check if login was successful (which shouldn't be in the case of SQL injection)
  const response = await page.waitForResponse(
    response => response.url().includes('php_services.php?target=controlleradmin'), // Adjust the condition to match the URL
    { timeout: 20000 }  // Increased timeout to 20 seconds
  );
  
  if (response.status() === 200) {
    console.log('Potential SQL injection vulnerability found.');
  } else {
    console.log('No SQL injection vulnerability detected.');
  }

  await browser.close();
});
