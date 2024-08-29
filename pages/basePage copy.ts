import LogingPage from "./login.page";
import myAPIPage from "./myApi.page";
import CommonPage from "./common.page";
import {test as base} from "@playwright/test";

 type pages={
    loginPage:LogingPage,
    myapiPage:myAPIPage,
    commonPage:CommonPage
 }

const test=base.extend<pages>({
    loginPage:async({page},use)=>{
        await use(new LogingPage(page));
    },
    myapiPage:async({page},use)=>{
        await use(new myAPIPage(page));
    },
    commonPage:async({page},use)=>{
        await use(new CommonPage(page));
    }
})

export default test;
export const expect=test.expect;
