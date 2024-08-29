import { Page } from "playwright";

export default class CommonPage{
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }

    public get manageApi(){
        return this.page.locator("//span[text()='Manage APIs']")
    }
    public get myAPIs(){
        return this.page.locator("//span[text()='My APIs']")
    }

    public get application(){
        return this.page.locator("//span[text()='Application']")
    }
    public get apiGroups(){
        return this.page.locator("//span[text()='API Groups']")
    }
    public get sharedResources(){
        return this.page.locator("//span[text()='Shared Resources']")
    }
    public get dataSourceConn(){
        return this.page.locator("//span[text()='Data Source Connectors']")
    }
    public get reports(){
        return this.page.locator("//span[text()='Reports']")
    }
    



    public async clickSideBar(sidebarName:string){
        if(sidebarName==='Manage APIs'){
            await this.manageApi.click();
        }else if(sidebarName==='My APIs'){
            await this.myAPIs.click();
            await this.page.waitForTimeout(1000);
        }else if(sidebarName==='Application'){
            await this.application.click();
            await this.page.waitForTimeout(1000);
        }else if(sidebarName==='API Groups'){
            await this.apiGroups.click();
            await this.page.waitForTimeout(1000);
        }else if(sidebarName==='Shared Resources'){
            await this.sharedResources.click();
            await this.page.waitForTimeout(1000);
        }else if(sidebarName==='Data Source Connectors'){
            await this.dataSourceConn.click();
            await this.page.waitForTimeout(1000);
        }else if(sidebarName==='Reports'){
            await this.reports.click();
            await this.page.waitForTimeout(1000);
        }
        await this.page.waitForTimeout(500);
    }

}