import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/applications.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;



test('PUT update organization', async ({ request,global }) => {
    const requestBody= dataset['PUT update organization']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('PUT update Mapping for role and user', async ({ request,global }) => {
    const requestBody= dataset['PUT update Mapping for role and user']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Get Market Place Config', async ({ request,global }) => {
    const requestBody= dataset['Get Market Place Config']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['createApplication'][0]['requestbody']; 
    requestInput.applicationName = `test App3_${await global.wrapper.generateRandomValue()}`;
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});

test('update SSO status', async ({ request,global }) => {   
    const requestBody= dataset['updateSSOstatus']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Resend Invite New User', async ({ request,global }) => {   
    const requestBody= dataset['Resend Invite New User']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('get SSO status', async ({ request,global }) => {   
    const requestBody= dataset['getSSOstatus']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Update Mail Configs', async ({ request,global }) => {   
    const requestBody= dataset['UpdateMailConfigs']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Add Mail Config ', async ({ request,global }) => {   
    const requestBody= dataset['AddMailConfig ']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('DELETE Organization User', async ({ request,global }) => {   
    const requestBody= dataset['DELETEOrganizationUser']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('DELETE Delete organisation', async ({ request,global }) => {   
    const requestBody= dataset['DELETEDeleteorganisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('POST-Add User Organization', async ({ request,global }) => {   
    const requestBody= dataset['AddUserOrganization']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Create Organization', async ({ request,global }) => {   
    const requestBody= dataset['CreateOrganization']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get All Mail Configs', async ({ request,global }) => {   
    const requestBody= dataset['GetAllMailConfigs']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Map Role to user', async ({ request,global }) => {   
    const requestBody= dataset['mapRoletouser']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Organization Users', async ({ request,global }) => {   
    const requestBody= dataset['OrganizationUsers']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('get admin public config details', async ({ request,global }) => {   
    const requestBody= dataset['updateSSOstatus']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get Config Status For Sign Up', async ({ request,global }) => {   
    const requestBody= dataset['GetConfigStatusForSignUp']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('POST fetch Audit Logs', async ({ request,global }) => {   
    const requestBody= dataset['POSTfetchAuditLogs']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Add beta users admin', async ({ request,global }) => {   
    const requestBody= dataset['AddbetaUsersAdmin']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Transefer ownership', async ({ request,global }) => {   
    const requestBody= dataset['TranseferOwnership']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GetbetausersAdmin', async ({ request,global }) => {   
    const requestBody= dataset['GetbetausersAdmin']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET Fetch Role Details of an Organisation', async ({ request,global }) => {   
    const requestBody= dataset['GETFetchRoleDetailsofanOrganisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET get UserInfo List', async ({ request,global }) => {   
    const requestBody= dataset['GETgetUserInfoList']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET fetch All Organisation List for the user', async ({ request,global }) => {   
    const requestBody= dataset['GET fetch All Organisation List for the user']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET List Of User And Roles Mapping of  an organisation', async ({ request,global }) => {   
    const requestBody= dataset['GET List Of User And Roles Mapping of  an organisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get beta users admin', async ({ request,global }) => {   
    const requestBody= dataset['Get beta users admin']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('update SSO status', async ({ request,global }) => {   
    const requestBody= dataset['GET Fetch Role Details of an Organisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET get UserInfo List', async ({ request,global }) => {   
    const requestBody= dataset['GET get UserInfo List']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET fetch All Organisation List for the user', async ({ request,global }) => {   
    const requestBody= dataset['GET fetch All Organisation List for the user']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET List Of User And Roles Mapping of  an organisation', async ({ request,global }) => {   
    const requestBody= dataset['GET List Of User And Roles Mapping of  an organisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('POST - Get Organization Details', async ({ request,global }) => {
    const requestBody= dataset['POST - Get Organization Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

test('get All Organization List', async ({ request,global }) => {
    const requestBody= dataset['get All Organization List']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('invite User To Organisation', async ({ request,global }) => {
    const requestBody= dataset['invite User To Organisation']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Enable Self Registration', async ({ request,global }) => {
    const requestBody= dataset['Enable Self Registration']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Test Mail Config', async ({ request,global }) => {
    const requestBody= dataset['Test Mail Config']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Add Category Details', async ({ request,global }) => {
    const requestBody= dataset['Add Category Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Save SSO Config', async ({ request,global }) => {
    const requestBody= dataset['Save SSO Config']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Post API Billing Date', async ({ request,global }) => {
    const requestBody= dataset['Post API Billing Date']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Get Admin Config', async ({ request,global }) => {
    const requestBody= dataset['Get Admin Config']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Category Details', async ({ request,global }) => {
    const requestBody= dataset['Category Details']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('sub Category Details', async ({ request,global }) => {
    const requestBody= dataset['sub Category Details']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Add Sub Category Details', async ({ request,global }) => {
    const requestBody= dataset['Add Sub Category Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Update Sub Category Details', async ({ request,global }) => {
    const requestBody= dataset['Update Sub Category Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Get SSO Configs', async ({ request,global }) => {
    const requestBody= dataset['Get SSO Configs']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Get API Billing Date', async ({ request,global }) => {
    const requestBody= dataset['getApplicationDetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('change Ownership Organisation', async ({ request,global }) => {
    const requestBody= dataset['change Ownership Organisation']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Upadte Admin Config', async ({ request,global }) => {
    const requestBody= dataset['Upadte Admin Config']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Update Category Details', async ({ request,global }) => {
    const requestBody= dataset['Update Category Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Upload Tag Image', async ({ request,global }) => {
    const requestBody= dataset['Upload Tag Image']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Delete Category Details', async ({ request,global }) => {
    const requestBody= dataset['Delete Category Details']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('get security details', async ({ request,global }) => {
    const requestBody= dataset['get security details']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Update security Details', async ({ request,global }) => {
    const requestBody= dataset['Update security Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Get Password Policy Details', async ({ request,global }) => {
    const requestBody= dataset['Get Password Policy Details']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Create Password Policy Details', async ({ request,global }) => {
    const requestBody= dataset['Create Password Policy Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Update Password Policy Details', async ({ request,global }) => {
    const requestBody= dataset['Update Password Policy Details']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Create Job', async ({ request,global }) => {
    const requestBody= dataset['Create Job']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('POST Add Role to organisation', async ({ request,global }) => {
    const requestBody= dataset['POST Add Role to organisation']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('user state', async ({ request,global }) => {
    const requestBody= dataset['user state']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});


test('Locked account list', async ({ request,global }) => {
    const requestBody= dataset['Locked account list']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Unlock account', async ({ request,global }) => {
    const requestBody= dataset['Unlock account']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

