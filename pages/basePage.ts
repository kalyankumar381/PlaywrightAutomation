import LogingPage from "./login.page";
import myAPIPage from "./myApi.page";
import CommonPage from "./common.page";
import {test as base} from "@playwright/test";
import { AllPages } from "./allPage";

 type pages={
    basePage:AllPages
 }

const test=base.extend<pages>({
    basePage:async({page},use)=>{
        await use(new AllPages(page));
    }
})

export default test;
export const expect=test.expect;
