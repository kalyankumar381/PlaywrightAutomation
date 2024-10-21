import { Page, TestInfo, test } from '@playwright/test';
import { Constants } from './constants';
import { ApiUtil } from "./api-util";
import { WebActions } from './WebActions';
import { AxeUtil } from './axe-util';

export class GlobalUtil{
    apiUtil: ApiUtil;
    webAction:WebActions;
    axeUtil:AxeUtil | undefined;
    // testInfo:TestInfo;
    private testCaseName:string;
    testId: string | undefined;
    tcName: string;
    tcTitle:string;
    testRunId:string | undefined;

    constructor(public page:Page,public request:any,public testInfo:TestInfo){
        this.apiUtil=new ApiUtil(request);
        this.webAction=new WebActions(page);
        this.axeUtil=new AxeUtil(testInfo);
        this.testInfo=testInfo;
        this.testCaseName=testInfo.title;
        const _testSpecName=testInfo.titlePath[0].split(".");
        this.tcName=_testSpecName[0];
        if(testInfo.retry>0){
            this.tcTitle=testInfo.title+' - retry'+testInfo.retry;
        }else{
            this.tcTitle=testInfo.title;
        }
    }
}