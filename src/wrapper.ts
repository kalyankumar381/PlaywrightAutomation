import { Locator, Page } from "playwright/test";

export default class Wrapper{
    constructor(public page:Page){}

    public async findLocator(value:string, options?:{
        frame?:string,
        tabid?:number,
        timeOut?:number,
        has?:Locator,
        hasText?:string
    }):Promise<Locator>{
        if(options?.frame){
            return this.page.frameLocator(options.frame).locator(value,{
                has:options?.has,
                hasText:options.hasText
            });
        }
        if(options?.tabid){
            this.page=await this.page.context().pages()[options.tabid]
        }
        return this.page.locator(value,{
            has:options?.has,
            hasNotText:options?.hasText
        })
    }


    public getUrl(page:Page):string{
        return page.url();
    };

    public async closeTab(options?:{
        tagId?:number
    }){
        if(options?.tagId){
            await this.page.context().pages()[options.tagId].close();
        }else{
            await this.page.close();
        }
    }

    public async generateRandomValue() {
        return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
    }    
}