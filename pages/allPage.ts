import { Page } from "playwright";
import CommonPage from "./common.page"
import LogingPage from "./login.page"
import myAPIPage from "./myApi.page"

export class AllPages{
    loginPage:LogingPage;
    myapiPage:myAPIPage;
    commonPage:CommonPage;
 
    constructor(page:Page){
        this.loginPage=new LogingPage(page);
        this.myapiPage=new myAPIPage(page);
        this.commonPage=new CommonPage(page);
    }
}