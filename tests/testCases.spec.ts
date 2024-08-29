import test, { Browser, BrowserContext, chromium, expect, Page } from "playwright/test";
import LogingPage from "../pages/login.page";
import Env from "../utils/environment";
import { log } from "console";
import * as data from '../data/login.json';
import { text } from "stream/consumers";
import CommonPage from "../pages/common.page";
import myAPI from "../pages/myApi.page";
import myAPIPage from "../pages/myApi.page";

let browser:Browser;
let context:BrowserContext;
let page:Page;
// pages
let login:LogingPage;
let commonPage:CommonPage;
let myApiPage:myAPIPage;

// test.beforeAll(async () => {
//     browser=await chromium.launch({
//         headless:false
//     });
//     context=await browser.newContext();
//     page=await context.newPage();
//     await page.goto(Env.test);
//     login=new LogingPage(page);
// });
test.beforeEach(async ({ page }) => {
    await page.goto(Env.test);
    login=new LogingPage(page);
    commonPage=new CommonPage(page);
    myApiPage=new myAPIPage(page);
})



test('Login to the apploication', async ({page}) => {
    await login.login(data.email,data.pass);
    await page.waitForTimeout(3000);
    const txt=await page.locator("//span[@class='mantine-1ryt1ht mantine-Button-label']/div").innerText();
    const txt1=await page.locator("//span[text()='Organization Overview']").innerText();
    expect(txt1).toBe("Organization Overview");
    // await page.click("//span[text()='Manage APIs']");    
    await commonPage.clickSideBar("Manage APIs");
    await commonPage.clickSideBar("My APIs");
    await commonPage.clickSideBar("Application");
    await commonPage.clickSideBar("API Groups");
    await commonPage.clickSideBar("Shared Resources");
    await commonPage.clickSideBar("Data Source Connectors");
    await commonPage.clickSideBar("Reports");
    await page.waitForTimeout(3000);
});

test('Login to the apploication negative', async ({page}) => {
    await login.login(data.email,data.pass);
    await page.waitForTimeout(3000);
    await commonPage.clickSideBar("Manage APIs");
    await commonPage.clickSideBar("My APIs");
    await page.waitForTimeout(3000);
    await myApiPage.creatMockApi("Kalyan1","kalyan_desc");
});

