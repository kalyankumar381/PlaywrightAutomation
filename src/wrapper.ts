import { Locator, Page, TestInfo } from "playwright/test";
import * as fs from 'fs';
import Env from '../utils/environment';
import { AES } from 'crypto-js';
import lighthouse from 'lighthouse';
import { info } from 'console';
import path from 'path';
import { Constants } from "./constants";

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
    
    async lighthouseGenerate(url: string, pageName: string, testInfo: TestInfo) {
        if (Constants.GLOBAL_LIGHTHOUSE_GENERATE) {
            
          const chromeLauncher = await import('chrome-launcher');
        
          const chrome = await chromeLauncher.launch({
            chromeFlags: ['--headless'],
          });
        
          const options: any = {
            port: chrome.port,
            output: 'html',
            onlyCategories: ['performance', 'accessibility', 'seo', 'pwa'],
            formFactor: 'desktop',
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
            screenEmulation: {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
              disabled: false,
            },
            logLevel: 'info',
          };
        
          const lighthouse = (await import('lighthouse')).default;
          const runnerResult: any = await lighthouse(url, options);
        
          console.log('Lighthouse score:', runnerResult.lhr.categories.performance.score);
        
          const reportDirectory = 'Lighthouse-report';
          if (!fs.existsSync(reportDirectory)) {
            fs.mkdirSync(reportDirectory);
          }
        
          const reportFileName = `Lighthouse-report_${pageName}_${Date.now()}.html`;
          const reportFilePath = path.join(reportDirectory, reportFileName);
        
          if (!runnerResult.report) {
            console.error('Lighthouse report is empty.');
            await chrome.kill();
            return;
          }
        
          try {
            fs.writeFileSync(reportFilePath, runnerResult.report);
            console.log(`Report saved: ${reportFilePath}`);
          } catch (err) {
            console.error('Error saving report:', err);
          }
        
          await chrome.kill();
        
          if (fs.existsSync(reportFilePath)) {
            console.log(`Attaching report: ${reportFileName}`);
            testInfo.attach(`Lighthouse Report - ${pageName}`, {
              body: fs.readFileSync(reportFilePath),
              contentType: 'text/html',
            });
          } else {
            console.error(`Report file not found: ${reportFilePath}`);
          }
        }
      }
}