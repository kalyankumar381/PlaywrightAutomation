import Env from "../utils/environment";
import * as data from '../data/login.json';
import test, {expect} from "../pages/basePage"; 
import { log } from "console";
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});

const testData=[{
    apiName:"kalyan1",
    apiDisc:"kalyan_desc",
}
]

test.beforeEach(async ({ page }) => {
    await page.goto(Env.test);
    // await page.goto(process.env.test);
});

test('Login to the apploication', async ({page,basePage}) => {
    await basePage.loginPage.login(data.email,data.pass);
    await page.waitForTimeout(3000);
    const txt=await page.locator("//span[@class='mantine-1ryt1ht mantine-Button-label']/div").innerText();
    const txt1=await page.locator("//span[text()='Organization Overview']").innerText();
    expect(txt1).toBe("Organization Overview");
    await basePage.commonPage.clickSideBar("Manage APIs");
    await basePage.commonPage.clickSideBar("My APIs");
    await basePage.commonPage.clickSideBar("Application");
    await basePage.commonPage.clickSideBar("API Groups");
    await basePage.commonPage.clickSideBar("Shared Resources");
    await basePage.commonPage.clickSideBar("Data Source Connectors");
    await basePage.commonPage.clickSideBar("Reports");
    await page.waitForTimeout(3000);
});
// one way
testData.forEach(testdata=>{
    test(`Createed Mock API -  ${testdata.apiName}`, async ({page,basePage}) => {
        await basePage.loginPage.login(data.email,data.pass);
        await page.waitForTimeout(3000);
        await basePage.commonPage.clickSideBar("Manage APIs");
        await basePage.commonPage.clickSideBar("My APIs");
        await page.waitForTimeout(2000);
        // await myapiPage.creatMockApi("Kalyan1","kalyan_desc");            
        await basePage.myapiPage.creatMockApi(testdata.apiName,testdata.apiDisc);
    });  
});


test('Check the grid and delete', async ({page, basePage }) => {
    await basePage.loginPage.login(data.email,data.pass);
    await page.waitForTimeout(3000);
    await basePage.commonPage.clickSideBar("Manage APIs");
    await basePage.commonPage.clickSideBar("My APIs");
    await basePage.myapiPage.getRowsAndColumns();
    const rowValue=await basePage.myapiPage.getCellValue("API Name",1);
    console.log(`Cell value is the --------- ${rowValue}`);

    for(let i=0;i<testData.length;i++){
        await basePage.myapiPage.clickButtonInRowByText(testData[i].apiName);
        await basePage.myapiPage.deleteMockApi();    
        await basePage.myapiPage.dialogDelete();
    }
      
    console.log(">>>>>>>>>>>>>>>>.. kalyan");
});


for(let i=0;i<testData.length;i++){
    test(`Createed Mock API_1 ::   ${i+1}`, async ({page,basePage}) => {
        await basePage.loginPage.login(data.email,data.pass);
        await page.waitForTimeout(2000);
        await basePage.commonPage.clickSideBar("Manage APIs");
        await basePage.commonPage.clickSideBar("My APIs");
        await page.waitForTimeout(2000);
        // await myapiPage.creatMockApi("Kalyan1","kalyan_desc");            
        await basePage.myapiPage.creatMockApi(testData[i].apiName,testData[i].apiDisc);
    });
}

test('Invalid Login', async ({ page,basePage }) => {
    await basePage.loginPage.login("",data.pass);
});


// test.afterEach(async ({ page }) => {
//     await page.goto(Env.test);
// });


