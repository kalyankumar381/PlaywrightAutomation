import { Page, TestInfo, test } from '@playwright/test';
import { Constants } from './constants';
import { ApiUtil } from "./api-util";
import { WebActions } from './WebActions';

export class GlobalUtil{
    apiUtil: ApiUtil;
    webAction:WebActions;
    // testInfo:TestInfo;
    private testCaseName:string;
    testId: string;
    tcName: string;
    tcTitle:string;
    testRunId:string;

    constructor(public page:Page,public request:any,public testInfo:TestInfo){
        this.apiUtil=new ApiUtil(request);
        this.webAction=new WebActions(page);
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