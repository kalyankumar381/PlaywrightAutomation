import { Page } from "playwright";
import { expect } from "playwright/test";

export default class LogingPage{
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }

    // Locator

    public get eleLoginBtn(){
        const loginBtn=this.page.$("text=Log in");
        if(loginBtn !==null){
            return loginBtn
        }else{
            throw new Error("No Element");
        }
    }

    public get eleUserNameTextField(){
        return this.page.locator("[placeholder='Enter your Email']")
    }

    public get elePassTextField(){
        return this.page.locator("[placeholder='Password']");
    }

    public get eleLginBtn(){
        return this.page.locator("//span[text()='Login']");
    }

    public async enterUserName(name:string){
        const ele=await this.eleUserNameTextField;
        if(ele!==null){
            await ele.fill(name);
        }else throw new Error("No element found");
    }

    public async enterPassword(pass:string){
        const ele=await this.elePassTextField;
        if(ele!==null){
            await ele.fill(pass);
        }else{
            throw new Error("No element found");
        }
    }

    public async clickLogBtn(){
        const ele=await this.eleLginBtn;
        if(ele!==null){
            await ele.click();
        }else{
            throw new Error("No element found");
        }
    };

    public async login(username:string, pass:string){
        expect(this.page.url()).toBe("http://rxtesting.yappes-enterprise.com/login/api-manager");
        await this.enterUserName(username);
        await this.enterPassword(pass);
        await this.clickLogBtn();
        await this.page.waitForURL("http://rxtesting.yappes-enterprise.com/");
        expect(this.page.url()).toBe("http://rxtesting.yappes-enterprise.com/");
    }

    public async login1(username:string, pass:string){
        await this.enterUserName(username);
        await this.enterPassword(pass);
        await this.clickLogBtn();
    }
}