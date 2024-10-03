import {APIRequestContext, Page } from "playwright";
import { ApiUtil } from "../src/api-util";
import { expect } from "playwright/test";
const dataset = JSON.parse(JSON.stringify(require('../data/applications.json')));
const baseUrl=process.env.baseUrl;
let apiUtil:ApiUtil;
export default class ApiCommonPage{
    // private request:APIRequest;    
    constructor(public request:any){
        this.request=request;
        apiUtil=new ApiUtil(request);
    }

    creatOrgPayLoad={
        endPoint: "/api/content/user/organization",
        statusCode: "post",
        requestBody: {
            organizationName: "ff"+this.generateRandomValue(),
            description: "",
            type: "internal"
        },
        token: "undefined",
        tokenType: "undefined"
    };

    public generateRandomValue() {
        return Math.floor(1000 + Math.random() * 9000); // Generates a random number between 1000 and 9999
    }  

    public async createOrganization(){
        const _responseForOrg=await apiUtil.POST(this.request,`${baseUrl}${this.creatOrgPayLoad.endPoint}`,this.creatOrgPayLoad.requestBody);
        console.log(_responseForOrg.status());
        let orgId:string="";
        if(_responseForOrg.status()===200){
            const orgJsonRes=await _responseForOrg.json();
            console.log(orgJsonRes);          
            orgId=orgJsonRes.data.organizationId
            console.log(orgId);
        }
        return orgId;
    };


    public async deleteOrganization(orgId:string){
        const _orgresponse=await apiUtil.DELETE(this.request,`${baseUrl}/api/content/user/organization/owner/${orgId}`);
        console.log(_orgresponse.status());
        await apiUtil.verifyStatusCode(_orgresponse,'200');
        console.log(await _orgresponse.json());   
        const orgresponseJson=await _orgresponse.json();      
        console.log(orgresponseJson.data.message);
        expect(orgresponseJson.data.message).toContain("Organization has been deleted successfully");
    }

    public async createInvoice(){
        let invoice:string="";
        const creatOrgPayLoad={
            endPoint: "/api/content/provider/billing/generate-invoice",
            statusCode: "post",
            requestBody: {
                "consumerOrganization": "ORG-DF554CBA",
                "invoicePeriod": {
                    "startDate": "2024-09-01 00:00:00",
                    "endDate": "2024-09-30 00:00:00"
                },
                "isInvoiceRegenerate": false,
                "oldInvoiceId": ""
            }
        };
        
    
        const createInvRes=await apiUtil.POST(this.request,`${baseUrl}${creatOrgPayLoad.endPoint}`,creatOrgPayLoad.requestBody);
        console.log(createInvRes.status());
        if(createInvRes.status()===200){
            const orgJsonRes=await createInvRes.json();
            console.log(orgJsonRes);          
            invoice=orgJsonRes.data.invoiceId
            console.log(invoice);
        }       
        return invoice; 
    }


    public async getGroupID(){
        let groupId:string="";
        const urls="/api/content/provider/apigroups";
        const url=`${baseUrl}${urls}` 
        const _response=await apiUtil.GET(this.request,`${url}`);
        if(_response.status()===200){
            const orgJsonRes=await _response.json();
            console.log(orgJsonRes);          
            groupId=orgJsonRes.data[0].groupId
            console.log(groupId);
        }     
        return groupId; 
    }

    public async getGroupIDWithName(){
        let groupId:string="";
        let groupName:string="";
        let logoUrl:string="";
        const urls="/api/content/provider/apigroups";
        const url=`${baseUrl}${urls}` 
        const _response=await apiUtil.GET(this.request,`${url}`);
        if(_response.status()===200){
            const orgJsonRes=await _response.json();
            console.log(orgJsonRes);          
            groupId=orgJsonRes.data[0].groupId
            console.log(groupId);
            groupName=orgJsonRes.data[0].groupName;
            logoUrl=orgJsonRes.data[0].logoUrl;
        }     
        return {"groupId":groupId,"groupName":groupName,"logoUrl":logoUrl}; 
    }


    public async createApplication(){
        let applicationId:string="";
        const requestBodyForPOST= dataset['createApplication']
        console.log(requestBodyForPOST); 
        const urlForPOST=`${baseUrl}${requestBodyForPOST[0].endPoint}` 
        const requestInput = dataset['createApplication'][0]['requestbody']; 
        requestInput.applicationName = `test App3_${await this.generateRandomValue()}`;
        console.log(requestInput); 
        const _responseForPOST=await apiUtil.POST(this.request,`${urlForPOST}`,requestInput);
        if(_responseForPOST.status()===200){
            const responseJson=await _responseForPOST.json();   
            applicationId=responseJson.data.applicationId  
        }

        return applicationId;
    }
}